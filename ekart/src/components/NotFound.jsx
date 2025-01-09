import UnauthHeader from "./UnauthHeader"

function NotFound() {
    return (
        <div className="NotFound">
            <UnauthHeader />
            This page does not exists.
        </div>
    )
}

export default NotFound