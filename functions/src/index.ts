import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const env = functions.config();

import * as algoliasearch from 'algoliasearch';

const client = algoliasearch(env.algolia.appid, env.algolia.apikey);
const index = client.initIndex('users');

exports.indexUsers = functions.firestore.document('users/{userid}').onCreate((snap, context) => {
    const data = snap.data();
    const objectID = snap.id;

    return index.addObject({

        objectID,
        ...data
    });
})

exports.unindexUser = functions.firestore.document('users/{userid}').onDelete((snap, context) => {
    const objectID = snap.id;

    return index.deleteObject(objectID);
});
