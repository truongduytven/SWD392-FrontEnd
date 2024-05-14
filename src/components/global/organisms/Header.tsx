import LogoFull from "@/assets/LogoFull.png"

function Header() {
  return (
    <div className="h-64 bg-gradient-to-b from-yellow-200 to-primary relative">
        <div className="w-full h-1/3 flex justify-center">
            <div className="px-6 w-1/5 h-full bg-secondary rounded-bl-full rounded-br-full shadow-lg">
                <img src={LogoFull} alt="Logo"/>
            </div>
        </div>
    </div>
  )
}

export default Header