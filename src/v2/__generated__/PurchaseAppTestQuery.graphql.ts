/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type PurchaseAppTestQueryVariables = {};
export type PurchaseAppTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"PurchaseApp_me">;
    } | null;
};
export type PurchaseAppTestQueryRawResponse = {
    readonly me: ({
        readonly orders: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly __typename: string | null;
                    readonly internalID: string;
                    readonly code: string;
                    readonly state: CommerceOrderStateEnum;
                    readonly mode: CommerceOrderModeEnum | null;
                    readonly createdAt: string;
                    readonly totalListPrice: string | null;
                    readonly itemsTotal: string | null;
                    readonly lineItems: ({
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly artwork: ({
                                    readonly date: string | null;
                                    readonly image: ({
                                        readonly resized: ({
                                            readonly url: string | null;
                                        }) | null;
                                    }) | null;
                                    readonly partner: ({
                                        readonly name: string | null;
                                        readonly id: string | null;
                                    }) | null;
                                    readonly internalID: string;
                                    readonly title: string | null;
                                    readonly artist_names: string | null;
                                    readonly id: string | null;
                                }) | null;
                                readonly id: string | null;
                            }) | null;
                        }) | null> | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
            readonly pageCursors: ({
                readonly around: ReadonlyArray<{
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }>;
                readonly first: ({
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }) | null;
                readonly last: ({
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }) | null;
                readonly previous: ({
                    readonly cursor: string;
                    readonly isCurrent: boolean;
                    readonly page: number;
                }) | null;
            }) | null;
            readonly pageInfo: {
                readonly endCursor: string | null;
                readonly hasNextPage: boolean;
                readonly hasPreviousPage: boolean;
                readonly startCursor: string | null;
            };
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type PurchaseAppTestQuery = {
    readonly response: PurchaseAppTestQueryResponse;
    readonly variables: PurchaseAppTestQueryVariables;
    readonly rawResponse: PurchaseAppTestQueryRawResponse;
};



/*
query PurchaseAppTestQuery {
  me {
    ...PurchaseApp_me
    id
  }
}

fragment PurchaseApp_me on Me {
  ...PurchaseHistory_me
}

fragment PurchaseHistory_me on Me {
  orders(first: 10) {
    edges {
      node {
        __typename
        internalID
        code
        state
        mode
        createdAt
        totalListPrice
        itemsTotal
        lineItems {
          edges {
            node {
              artwork {
                date
                image {
                  resized(width: 55) {
                    url
                  }
                }
                partner {
                  name
                  id
                }
                internalID
                title
                artist_names: artistNames
                id
              }
              id
            }
          }
        }
        id
      }
    }
    pageCursors {
      around {
        cursor
        isCurrent
        page
      }
      first {
        cursor
        isCurrent
        page
      }
      last {
        cursor
        isCurrent
        page
      }
      previous {
        cursor
        isCurrent
        page
      }
    }
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cursor",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "page",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PurchaseAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PurchaseApp_me"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PurchaseAppTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              }
            ],
            "concreteType": "CommerceOrderConnectionWithTotalCount",
            "kind": "LinkedField",
            "name": "orders",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOrderEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v0/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "state",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "totalListPrice",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "itemsTotal",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceLineItemConnection",
                        "kind": "LinkedField",
                        "name": "lineItems",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceLineItemEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceLineItem",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Artwork",
                                    "kind": "LinkedField",
                                    "name": "artwork",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "date",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "image",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "width",
                                                "value": 55
                                              }
                                            ],
                                            "concreteType": "ResizedImageUrl",
                                            "kind": "LinkedField",
                                            "name": "resized",
                                            "plural": false,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "kind": "ScalarField",
                                                "name": "url",
                                                "storageKey": null
                                              }
                                            ],
                                            "storageKey": "resized(width:55)"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Partner",
                                        "kind": "LinkedField",
                                        "name": "partner",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "name",
                                            "storageKey": null
                                          },
                                          (v1/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v0/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "title",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": "artist_names",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "artistNames",
                                        "storageKey": null
                                      },
                                      (v1/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v1/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommercePageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommercePageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": (v2/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommercePageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "orders(first:10)"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PurchaseAppTestQuery",
    "operationKind": "query",
    "text": "query PurchaseAppTestQuery {\n  me {\n    ...PurchaseApp_me\n    id\n  }\n}\n\nfragment PurchaseApp_me on Me {\n  ...PurchaseHistory_me\n}\n\nfragment PurchaseHistory_me on Me {\n  orders(first: 10) {\n    edges {\n      node {\n        __typename\n        internalID\n        code\n        state\n        mode\n        createdAt\n        totalListPrice\n        itemsTotal\n        lineItems {\n          edges {\n            node {\n              artwork {\n                date\n                image {\n                  resized(width: 55) {\n                    url\n                  }\n                }\n                partner {\n                  name\n                  id\n                }\n                internalID\n                title\n                artist_names: artistNames\n                id\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n    pageCursors {\n      around {\n        cursor\n        isCurrent\n        page\n      }\n      first {\n        cursor\n        isCurrent\n        page\n      }\n      last {\n        cursor\n        isCurrent\n        page\n      }\n      previous {\n        cursor\n        isCurrent\n        page\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2a8342c088be1d2089cf8faf529df2a1';
export default node;
