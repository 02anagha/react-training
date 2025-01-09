import Header from "./Header"
import UnauthHeader from "./UnauthHeader"

function Home() {

  sessionStorage.clear()

  return (
    <div className="home">  
    <UnauthHeader />    
      <div>
        Welcom to ThemeForest. We specilise in bringing you unique home decor items.
      </div>
    </div>
  )
}

export default Home