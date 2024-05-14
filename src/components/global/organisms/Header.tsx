import LogoFull from '@/assets/LogoFull.png'
import { Button } from '../atoms/button'
import Container from '../atoms/container'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../atoms/navigation-menu'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='w-full h-20 bg-black bg-opacity-30 absolute border-white'>
      <Container>
        <div className='w-full h-full flex justify-between items-center'>
          <div className='w-1/4'>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                      <Link to="/">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Trang chủ
                        </NavigationMenuLink>
                      </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <Link to="/searchTicket">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Tra cứu vé
                        </NavigationMenuLink>
                      </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <Link to="/discount">
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                            Ưu đãi
                        </NavigationMenuLink>
                      </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
          </div>
          <div className='flex justify-center items-center w-1/5 bg-secondary rounded-bl-full rounded-br-full shadow-lg'>
            <img src={LogoFull} alt='Logo' className='scale-75' />
          </div>
          <div className='w-1/4 text-right'>
            <Link to="/login"><Button className='bg-transparent text-secondary font-bold text-md hover:bg-secondary hover:text-tertiary'>Đăng ký/Đăng nhập</Button></Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
