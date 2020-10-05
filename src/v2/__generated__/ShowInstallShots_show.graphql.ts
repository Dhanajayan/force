/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowInstallShots_show = {
    readonly name: string | null;
    readonly images: ReadonlyArray<{
        readonly internalID: string | null;
        readonly mobile1x: {
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _2x: {
            readonly src: string | null;
        } | null;
        readonly zoom1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly zoom2x: {
            readonly src: string | null;
        } | null;
    } | null> | null;
    readonly " $refType": "ShowInstallShots_show";
};
export type ShowInstallShots_show$data = ShowInstallShots_show;
export type ShowInstallShots_show$key = {
    readonly " $data"?: ShowInstallShots_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowInstallShots_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 400
  }
],
v3 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  (v0/*: any*/),
  (v1/*: any*/)
],
v5 = [
  (v3/*: any*/)
],
v6 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 900
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 900
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowInstallShots_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "images",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "internalID",
          "storageKey": null
        },
        {
          "alias": "mobile1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 300
            }
          ],
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/)
          ],
          "storageKey": "resized(height:300)"
        },
        {
          "alias": "_1x",
          "args": (v2/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": "resized(height:400)"
        },
        {
          "alias": "_2x",
          "args": (v2/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "resized(height:400)"
        },
        {
          "alias": "zoom1x",
          "args": (v6/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v4/*: any*/),
          "storageKey": "resized(height:900,width:900)"
        },
        {
          "alias": "zoom2x",
          "args": (v6/*: any*/),
          "concreteType": "ResizedImageUrl",
          "kind": "LinkedField",
          "name": "resized",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "resized(height:900,width:900)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = '66883e6414fa8a3aa5b848e4efa81d33';
export default node;
