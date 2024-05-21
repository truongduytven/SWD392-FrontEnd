import LogoFull from '@/assets/LogoFull2.png'
import { Button } from '../atoms/button'
import Container from '../atoms/container'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '../atoms/navigation-menu'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()
  return (
    <div
      className={`w-full h-20 absolute border-white ${location.pathname === '/' ? 'bg-black bg-opacity-30' : 'bg-tertiary'}`}
    >
      <Container>
        <div className='w-full h-full flex justify-between items-center'>
          <div className='w-1/4'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to='/'>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trang chủ</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to='/search'>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tra cứu vé</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to='/discount'>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Ưu đãi</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='flex justify-center items-center w-1/5 bg-secondary rounded-bl-full rounded-br-full shadow-lg'>
            <Link to='/'>
              <img src={LogoFull} alt='Logo' className='scale-75' />
            </Link>
          </div>
          <div className='w-1/4 text-right'>
            <Link to='/login'>
              <Button className='bg-transparent text-secondary font-bold text-md hover:bg-secondary hover:text-primary'>
                Đăng ký/Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
