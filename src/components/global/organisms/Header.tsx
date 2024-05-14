import LogoFull from '@/assets/LogoFull.png'
import { Button } from '../atoms/button'
import Container from '../atoms/container'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '../atoms/navigation-menu'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='w-full h-20 bg-transparent absolute border-b border-white'>
      {/* <Container>
        <div className='w-full h-1/3 flex justify-center'>
          <div className='flex justify-center items-center w-1/5 h-full bg-secondary rounded-bl-full rounded-br-full shadow-lg'>
            <img src={LogoFull} alt='Logo' className='scale-75' />
          </div>
        </div>
        <div className='flex justify-end h-1/5'>
          <Button className='bg-secondary'>Đăng nhập/Đăng ký</Button>
        </div>
      </Container> */}
      <Container>
        <div className='w-full h-full flex justify-between items-center'>
          <div className='w-1/4'>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                      <Link to="/searchTicket">
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
                      <Link to="/searchTicket">
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
            <Button className='border-none bg-transparent text-secondary font-bold text-md hover:bg-secondary hover:text-primary'>Đăng ký/Đăng nhập</Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
