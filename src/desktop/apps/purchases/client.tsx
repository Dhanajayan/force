import { buildClientApp } from "v2/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes } from "v2/Apps/Purchase/routes"
import React from "react"
import ReactDOM from "react-dom"
import { setupArtistSignUpModal } from "desktop/components/artistSignupModal/artistSignupModal"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes,
  context: {
    user: sd.CURRENT_USER,
    mediator,
  } as any,
})
  .then(({ ClientApp }) => {
    ReactDOM.hydrate(
      <ClientApp />,
      document.getElementById("react-root"),
      () => {
        setupArtistSignUpModal()
      }
    )
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
