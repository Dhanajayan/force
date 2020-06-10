import { Box, Button, Flex, Sans, Serif } from "@artsy/palette"
import { CreditCardInstructions } from "v2/Apps/Auction/Components/CreditCardInstructions"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { ConditionsOfSaleCheckbox } from "v2/Components/Auction/ConditionsOfSaleCheckbox"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import {
  Form,
  Formik,
  FormikHelpers as FormikActions,
  FormikProps,
} from "formik"
import React from "react"
import { ReactStripeElements } from "react-stripe-elements"
import createLogger from "v2/Utils/logger"
import {
  Registration,
  createStripeWrapper,
  initialValuesForRegistration,
  toStripAddress,
} from "v2/Apps/Auction/Components/Form"

const logger = createLogger("Apps/Auction/Components/RegistrationForm")

export interface FormResult {
  token: stripe.Token
  phoneNumber: string
}

export interface FormValues {
  address: Address
  creditCard: string
  agreeToTerms: boolean
}

interface InnerFormProps extends FormikProps<FormValues> {
  needsIdentityVerification: boolean
}

const InnerForm: React.FC<InnerFormProps> = props => {
  const {
    touched,
    errors,
    isSubmitting,
    values,
    setFieldError,
    setFieldValue,
    setFieldTouched,
    status,
    needsIdentityVerification,
  } = props

  return (
    <Form>
      <Box mt={4}>
        <Box mb={2}>
          <Serif size="3t" mb={0.5}>
            Credit card
          </Serif>
          <CreditCardInput
            error={{ message: errors.creditCard } as stripe.Error}
            onChange={({ error }) =>
              setFieldError("creditCard", error?.message)
            }
          />
        </Box>
      </Box>
      <Box mt={4}>
        <Box mt={2}>
          <AddressForm
            value={values.address}
            onChange={(address, _key) => {
              setFieldValue("address", address)
            }}
            errors={errors.address}
            touched={touched.address}
            billing
            showPhoneNumberInput
          />
        </Box>
      </Box>

      {needsIdentityVerification && (
        <>
          <Serif size="4t" pb={2}>
            This auction requires Artsy to verify your identity before bidding.
          </Serif>

          <Serif size="4t">
            After you register, you’ll receive an email with a link to complete
            identity verification.
          </Serif>
        </>
      )}

      <Flex mt={4} mb={2} flexDirection="column" justifyContent="center">
        <Box mx="auto">
          <ConditionsOfSaleCheckbox
            selected={values.agreeToTerms}
            onSelect={value => {
              // `setFieldTouched` needs to be called first otherwise it would cause race condition.
              setFieldTouched("agreeToTerms")
              setFieldValue("agreeToTerms", value)
            }}
          />
        </Box>

        {touched.agreeToTerms && errors.agreeToTerms && (
          <Sans mt={1} color="red100" size="2" textAlign="center">
            {errors.agreeToTerms}
          </Sans>
        )}
      </Flex>

      {status && (
        <Sans textAlign="center" size="3" color="red100" mb={2}>
          {status}.
        </Sans>
      )}

      <Button
        mt={1}
        size="large"
        width="100%"
        loading={isSubmitting}
        {...({ type: "submit" } as any)}
      >
        Register
      </Button>
    </Form>
  )
}

export type TrackErrors = (errors: string[]) => void

/*
  This component exists only to capture formik's renderProps and track form
  submission events. It essentially says:
  - IF the form has been submitted at least once
  - AND the form is not submitting at this moment
  - AND the form is invalid
  - AND (in useEffect dependencies array) the form submitting state just
    changed (because it is false, it must have been true above)
  - THEN run the callback prop.
  Background:
    https://github.com/jaredpalmer/formik/issues/1484#issuecomment-490558973
 */
export const OnSubmitValidationError: React.FC<{
  cb: TrackErrors
  formikProps: Partial<FormikProps<FormValues>>
}> = props => {
  const { cb, formikProps } = props

  const effect = () => {
    if (
      formikProps.submitCount > 0 &&
      !formikProps.isSubmitting &&
      !formikProps.isValid
    ) {
      const clonedErrors = Object.assign({}, formikProps.errors)
      const addressErrors = clonedErrors.address
      delete clonedErrors.address

      const errors = Object.assign({}, clonedErrors, addressErrors)

      cb(Object.values(errors as string[]))
      formikProps.setSubmitting(false)
    }
  }
  React.useEffect(effect, [formikProps.submitCount, formikProps.isSubmitting])

  return null
}

export interface RegistrationFormProps
  extends ReactStripeElements.InjectedStripeProps {
  onSubmit: (formikActions: FormikActions<object>, result: FormResult) => void
  trackSubmissionErrors: TrackErrors
  needsIdentityVerification: boolean
}

export const RegistrationForm: React.FC<RegistrationFormProps> = props => {
  async function createTokenAndSubmit(
    values: FormValues,
    actions: FormikActions<object>
  ) {
    const address = toStripAddress(values.address)
    const { setFieldError, setSubmitting, setStatus } = actions
    const { stripe } = props

    try {
      const { error, token } = await stripe.createToken(address)

      if (error) {
        setFieldError("creditCard", error.message)
        setSubmitting(false)
      } else {
        const result: FormResult = {
          phoneNumber: values.address.phoneNumber,
          token,
        }

        props.onSubmit(actions, result)
      }
    } catch (error) {
      logger.error(error)
      setSubmitting(false)
      setStatus(
        "Something went wrong while processing your bid. Please make sure your internet connection is active and try again"
      )
    }
  }

  return (
    <Box maxWidth={550}>
      <CreditCardInstructions />

      <Box mt={2}>
        <Formik
          initialValues={initialValuesForRegistration}
          onSubmit={createTokenAndSubmit}
          validationSchema={Registration.validationSchema}
        >
          {(formikProps: FormikProps<FormValues>) => (
            <>
              <OnSubmitValidationError
                cb={props.trackSubmissionErrors}
                formikProps={formikProps}
              />
              <InnerForm
                {...formikProps}
                needsIdentityVerification={props.needsIdentityVerification}
              />
              <ErrorModal
                show={formikProps.status === "submissionFailed"}
                onClose={() => {
                  formikProps.setStatus(null)
                }}
              />
            </>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export const StripeWrappedRegistrationForm = createStripeWrapper(
  RegistrationForm
)
