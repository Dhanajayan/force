_               = require 'underscore'
Backbone        = require 'backbone'
{ Image }       = require 'artsy-backbone-mixins'
{ Dimensions }  = require 'artsy-backbone-mixins'

{ ARTSY_URL, SECURE_IMAGES_URL } = require('sharify').data

module.exports = class AuctionLot extends Backbone.Model
  urlRoot: "#{ARTSY_URL}/api/v1/auction_lot"

  _.extend @prototype, Dimensions
  _.extend @prototype, Image(SECURE_IMAGES_URL)

  formattedEstimateText: ->
    @get('estimate_text')?.replace /\ -\ /, '&nbsp;&ndash;<br>'

  href: (artist) ->
    "/artist/#{artist.id}/auction-result/#{@id}"

  # Overwrite #imageUrl because we need to replace thumbnail
  imageUrl: (version) ->
    @sslUrl @get('image_url').replace 'thumbnail', version

  # @return {Boolean}
  hasImage: ->
    @get('image_url') isnt '/assets/shared/missing_image.png'

  # @return {Boolean}
  hasDimensions: ->
    (@get('dimensions')?.in or @get('dimensions')?.cm)?

  # Format: "[Artwork Title], by [Artist Name] | Auction Result from [Auction house name] | Artsy"
  # (Often auction lots have an artist_name but it is commonly missing, so the artist is explicitly passed in)
  #
  # @return {String}
  toPageTitle: (artist) ->
    titleAndName  = @get('title') or 'Untitled'
    titleAndName += ", by #{artist?.get('name')}" if artist?.get('name')
    _.compact([
      titleAndName
      ("Auction Result from #{@get('organization')}" if @get('organization'))
      'Artsy'
    ]).join ' | '

  toPageDescription: ->
    'Find auction estimate and sale price, and research more auction results from top auction houses.'
