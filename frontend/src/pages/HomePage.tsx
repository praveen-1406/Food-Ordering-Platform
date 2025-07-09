import landingImage from "../assets/landing.png"
import appDownlaodImage from "../assets/appDownload.png"

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 mx-26">
      <div className="bg-white rounded-lg shadow-md py-8 felx flex-col gap-5 text-center -mt-16">
        <h1 className="text5xl font-bold tracking-tight text-orange-600">
            Tuck into a Takway today
        </h1> 
        <span className="text-xl">Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap5">
        <img src={landingImage}  />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised recommendations.
          </span>
          <img src={appDownlaodImage}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage
