import useAuthStore from '@/store/auth/slice'
import { Button, Dropdown, Flex, MenuProps, theme } from 'antd'
import { Header } from 'antd/es/layout/layout'
import { Link } from 'react-router-dom'

const HeaderLayout = () => {
  const logout = useAuthStore((state) => state.logout)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link rel="noopener noreferrer" to="/login" onClick={() => logout()}>
          Выйти
        </Link>
      ),
    },
  ]

  return (
    <Header style={{ background: colorBgContainer }}>
      <Flex align="center" justify="space-between">
        <Flex vertical align="center" justify="center">
          <h1>Aralhub</h1>
        </Flex>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button type="default">Профиль</Button>
        </Dropdown>
      </Flex>
    </Header>
  )
}

export { HeaderLayout }
