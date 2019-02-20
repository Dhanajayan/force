qs = require 'qs'
_ = require 'underscore'
Backbone = require 'backbone'

module.exports = class Params extends Backbone.Model
  allowedURLs: [
    'source'
    'page'
    'medium'
    'color'
    'price_range'
    'width'
    'height'
    'gene_id'
    'sort'
    'major_periods'
    'partner_cities'
    'sale_id'
    'gene_ids'
    'artist_ids'
    'keyword'
  ]

  UTM = '^utm.*'

  defaults:
    size: 40
    page: 1
    sort: '-decayed_merch'
    for_sale: true
    major_periods: []
    partner_cities: []
    gene_ids: []
    artist_ids: []
    aggregations: ['TOTAL', 'FOLLOWED_ARTISTS']
    ranges:
      price_range:
        min: 50.00
        max: 50000.00
      width:
        min: 1
        max: 120
      height:
        min: 1
        max: 120

  initialize: (attributes, { @categoryMap, @fullyQualifiedLocations }) ->

  initialParams: ->
    @defaults

  current: ->
    if @categoryMap
      categories = @categoryMap[@get('medium') || 'global']
      extra_aggregation_gene_ids = _.pluck categories, 'id'
      _.extend @attributes, extra_aggregation_gene_ids: extra_aggregation_gene_ids, aggregation_partner_cities: @allLocations()
    else
      @attributes

  allLocations: ->
    _.uniq(@fullyQualifiedLocations.concat((@get('aggregation_partner_cities') || [])).concat @get('partner_cities'))

  allowed: ->
    paramsFromUrl = qs.parse(location.search.replace(/^\?/, ''))
    allowedUrlParams = _.pick paramsFromUrl, (value, key) ->
      new RegExp(UTM).test key

    allowedFilterParams = _.pick @current(), @allowedURLs

    allowedParams = _.assign allowedFilterParams, allowedUrlParams

    _.omit allowedParams, (val, key) ->
      (key is 'page' and val is 1) or
      not val?
