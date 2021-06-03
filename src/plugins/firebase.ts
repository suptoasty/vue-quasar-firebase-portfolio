import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
require("dotenv").config()

//categories doc id: AYymYFhmgqHZj8Rbz3ds

// firebase init - add your own config here
const firebaseConfig = {
	apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
	authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VUE_APP_FIREBASE_APP_ID,
}
export default !firebase.apps.length
	? firebase.initializeApp(firebaseConfig)
	: firebase.app()

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()
// provider scopes here

// collection references
const usersCollection = db.collection("users")
const gamesCollection = db.collection("games")
const postsCollection = db.collection("posts")
const commentsCollection = db.collection("comments")
const likesCollection = db.collection("likes")
const contactFormsCollection = db.collection("contact-forms")
const categoriesDoc = db.collection("categories").doc("AYymYFhmgqHZj8Rbz3ds")

// queried data
const featuredPostsQuery = postsCollection
	.where("featured", "==", true)
	.where("hidden", "==", false)

// export utils/refs
export {
	db,
	auth,
	provider,
	// collections
	usersCollection,
	gamesCollection,
	postsCollection,
	commentsCollection,
	likesCollection,
	contactFormsCollection,
	// queried snapshots
	featuredPostsQuery,
	categoriesDoc,
}
