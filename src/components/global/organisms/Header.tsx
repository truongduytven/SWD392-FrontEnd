import LogoFull from '@/assets/LogoFull23.png'
import { Button } from '../atoms/button'
import Container from '../atoms/container'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from '../atoms/navigation-menu'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header
      className='w-full shadow-md fixed top-0 z-50 bg-white'
    >
      <Container>
        <div className='w-full h-20 flex justify-between items-center'>
          <div className='w-1/4'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to='/'>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trang chủ</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to='/ticketInfo'>
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
          <div className='flex justify-center items-center h-full'>
            <Link to='/'>
              <img src={LogoFull} alt='Logo' className='h-full' />
            </Link>
          </div>
          <div className='w-1/4 text-right'>
            <Link to='/login'>
              <Button className='bg-transparent text-primary font-bold text-md hover:bg-primary hover:text-secondary'>
                Đăng ký/Đăng nhập
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
