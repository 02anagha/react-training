import Header from "./Header"

function Profile() {
    const accountDetails = JSON.parse(sessionStorage.getItem('accountDetails'))
    return(
        <div>
            <Header />
            Profile
            <p>Name: {accountDetails.name}</p>
            <p>Email: {accountDetails.email}</p>
            <p>Address: {accountDetails.address}</p>
            <p>Pincode: {accountDetails.pincode}</p>
        </div>
    )
}

export default Profile