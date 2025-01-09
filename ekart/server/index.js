import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';
import { firestore } from './firebase.js'
import {
    addDoc, collection, query,
    onSnapshot,
    getDocs,
    updateDoc,
    deleteDoc, where, or
} from "@firebase/firestore"


const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/items', async (req, res) => {
    const ref = collection(firestore, "items")
    const querySnapshot = await getDocs(ref);
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    res.status(200).json(data);
});

app.post('/itemDetails/:itemId', async (req, res) => {
    const itemId = req.params['itemId'];
    const ref = collection(firestore, "itemDetails")
    const detailsQuery = query(ref, where("itemId", "==", itemId));
    const querySnapshot = await getDocs(detailsQuery);
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    res.status(200).json(data);
});

app.post('/register', async (req, res) => {
    const userData = req.body.user;
    let message = ""
    if (userData === null || userData.items === null || userData.items == []) {
        return res
            .status(400)
            .json({ message: 'Missing data' });
    }

    if (
        userData['email'] === null ||
        !userData['email'].includes('@') ||
        userData['name'] === null ||
        userData['name'].trim() === '' ||
        userData['address'] === null ||
        userData['address'].trim() === '' ||
        userData['pincode'] === null ||
        userData['pincode'].trim() === '' ||
        userData['password'] === null ||
        userData['password'].trim() === ''
    ) {
        return res.status(400).json({
            message:
                'Missing data',
        });
    }

    userData['email'] = userData['email'].toLowerCase()
    const ref = collection(firestore, "users")


    const emailCheck = query(ref, where("email", "==", userData['email']));

    const querySnapshot = await getDocs(emailCheck);
    if (!querySnapshot.empty) {
        message = "Existing User"
    } else {
        addDoc(ref, userData)
        message = 'User Registered!'
    }

    res.status(200).json({ message: message });
});

app.post('/login', async (req, res) => {
    const userData = req.body.user;

    let message = ""
    if (userData === null || userData.items === null || userData.items == []) {
        return res
            .status(400)
            .json({ message: 'Missing data' });
    }
    userData['email'] = userData['email'].toLowerCase()
    const ref = collection(firestore, "users")
    const user = []


    const loginQuery = query(ref, where("email", "==", userData['email']), where("password", "==", userData['password']));

    const querySnapshot = await getDocs(loginQuery);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            user.push(doc.data())
            user[0]['id'] = doc.id
        });
        res.status(200).json(user);
    } else {
        res.status(200).json({ message: 'Invalid credentials' });
    }
});

app.post('/orders', async (req, res) => {
    const orderData = req.body.order;

    if (orderData === null || orderData.items === null || orderData.items == []) {
        return res
            .status(400)
            .json({ message: 'Missing data.' });
    }
    const ref = collection(firestore, "orders")
    addDoc(ref, orderData)

    res.status(200).json({ message: 'Order created!' });
});

app.post('/addItem', async (req, res) => {
    const orderData = req.body.item;

    if (orderData === null || orderData.items === null || orderData.items == []) {
        return res
            .status(400)
            .json({ message: 'Missing data.' });
    }
    const ref = collection(firestore, "itemDetails")
    addDoc(ref, orderData)

    res.status(200).json({ message: 'Item added' });
});

app.get('/previousOrders/:userId', async (req, res) => {
    const userId = req.params['userId'];
    const ref = collection(firestore, "orders")
    const detailsQuery = query(ref, where("userId", "==", userId));
    const querySnapshot = await getDocs(detailsQuery);
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    res.status(200).json(data);
});

app.post('/search', async (req, res) => {
    const searchValue = req.body.searchValue;
    if (searchValue === null || searchValue === '') {
        return res
            .status(400)
            .json({ message: 'Missing data' });
    }
    const searchRef = collection(firestore, "items")
    const searchQuery = query(searchRef, or(where("name", "==", searchValue), where("itemId", "==", searchValue), where("price", "==", searchValue)));
    const querySnapshot = await getDocs(searchQuery);
    const data = []
    querySnapshot.forEach((doc) => {
        data.push(doc.data())
    });
    res.status(200).json(data);
});

app.use((req, res) => {
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    res.status(404).json({ message: 'Not found' });
});

app.listen(3000);