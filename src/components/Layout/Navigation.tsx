import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  CarOutlined,
  BranchesOutlined,
  BankOutlined,
  TranslationOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

const menutItems = [
  {
    key: '/',
    label: 'Главная',
    icon: <HomeOutlined />,
  },
  {
    key: '/drivers-parent',
    label: 'Водители',
    icon: <UserOutlined />,
    children: [
      {
        key: '/drivers/registration',
        label: 'Регистрация',
      },
      {
        key: '/drivers',
        label: 'Водители',
      },
      {
        key: '/drivers/types',
        label: 'Типы водителей',
      },
    ],
  },
  {
    key: '/cars-parent',
    label: 'Машины',
    icon: <CarOutlined />,
    children: [
      {
        key: '/cars',
        label: 'Машины',
      },
      {
        key: '/cars/colors/assign',
        label: 'Цвета машин',
      },
      {
        key: '/cars/colors',
        label: 'Цвета',
      },
      {
        key: '/cars/types',
        label: 'Типы машин',
      },
    ],
  },
  {
    key: '/regions-parent',
    label: 'Регионы',
    icon: <BankOutlined />,
    children: [
      {
        key: '/regions',
        label: 'Регионы',
      },
      {
        key: '/regions/translations',
        label: 'Переводы',
      },
      {
        key: '/regions/types',
        label: 'Типы регионов',
      },
    ],
  },
  {
    key: '/routes-parent',
    label: 'Маршруты',
    icon: <BranchesOutlined />,
    children: [
      {
        key: '/routes/special',
        label: 'Специальные',
      },
      {
        key: '/routes/taxi',
        label: 'Такси',
      },
      {
        key: '/routes/types',
        label: 'Типы маршрутов',
      },
    ],
  },
  {
    key: '/languages',
    label: 'Языки',
    icon: <TranslationOutlined />,
  },
]

function Navigation() {
  const [collapsed, setCollapsed] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onCollapse = () => setCollapsed(!collapsed)

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 1000,
        }}
      >
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[pathname]}
          onClick={(e) => navigate(e.key)}
          items={menutItems}
        />
      </Sider>
    </>
  )
}
export { Navigation }
