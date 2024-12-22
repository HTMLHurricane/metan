import { useCallback, useState } from 'react'
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Popconfirm,
  Space,
  Flex,
  Upload,
  message,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'

interface FormField {
  name: string
  label: string
  rules: any[]
  component: string
  options?: { value: string; label: string }[]
}

interface CRUDModuleProps<T> {
  data: T[]
  columns: any[]
  formFields?: FormField[]
  onAdd?: (record: T) => Promise<void>
  onEdit?: (id: string, record: T) => Promise<void>
  onDelete?: (id: string) => Promise<void>
  title: string
}

function CRUDModule<T extends { id: string }>({
  data,
  columns,
  formFields,
  onAdd,
  onEdit,
  onDelete,
  title,
}: CRUDModuleProps<T>) {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState<T | null>(null)
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const showDrawer = useCallback(
    (record?: T) => {
      setEditingRecord(record || null)
      setIsDrawerVisible(true)
      if (record) {
        form.setFieldsValue(record)
        setFileList(
          'imageUrl' in record && typeof record.imageUrl === 'string'
            ? [
                {
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: record.imageUrl,
                },
              ]
            : []
        )
      } else {
        form.resetFields()
        setFileList([])
      }
    },
    [form]
  )

  const closeDrawer = useCallback(() => {
    setIsDrawerVisible(false)
    setEditingRecord(null)
    form.resetFields()
    setFileList([])
  }, [form])

  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields()
    if (fileList.length > 0 && fileList[0].originFileObj) {
      values.image = fileList[0].originFileObj
    } else {
      delete values.image
    }
    if (editingRecord && onEdit) {
      await onEdit(editingRecord.id, values)
    } else if (onAdd) {
      await onAdd(values)
    }
    closeDrawer()
  }, [form, fileList, editingRecord, onEdit, onAdd, closeDrawer])

  const handleDelete = useCallback(
    async (id: string) => {
      if (onDelete) await onDelete(id)
    },
    [onDelete]
  )

  const actionColumn = {
    title: 'Действия',
    key: 'action',
    fixed: 'right',
    render: (_: any, record: T) => (
      <Space>
        {onEdit && (
          <Button icon={<EditOutlined />} onClick={() => showDrawer(record)} />
        )}
        {onDelete && (
          <Popconfirm
            title='Вы уверены, что хотите удалить это?'
            onConfirm={() => handleDelete(record.id)}
            okText='Да'
            cancelText='Нет'
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        )}
      </Space>
    ),
  }

  const allColumns = onEdit || onDelete ? [...columns, actionColumn] : columns

  const renderFormField = (field: FormField) => {
    switch (field.component) {
      case 'Select':
        return (
          <Select>
            {field.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )
      case 'File':
        return (
          <Upload
            listType='picture-card'
            fileList={fileList}
            onPreview={(file) => {
              if (file.url) {
                window.open(file.url)
              }
            }}
            onChange={({ fileList: newFileList }) => {
              setFileList(newFileList.slice(-1))
            }}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith('image/')
              if (!isImage) {
                message.error('Вы можете загрузить только изображение!')
                return Upload.LIST_IGNORE
              }
              return false // Prevent auto upload
            }}
            maxCount={1}
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Загрузить</div>
              </div>
            )}
          </Upload>
        )
      case 'Input':
      default:
        return <Input />
    }
  }

  return (
    <div>
      <Flex align='center' justify='space-between'>
        <h1>Управление {title}</h1>
        {onAdd && (
          <Button
            icon={<PlusOutlined />}
            onClick={() => showDrawer()}
            style={{ marginBottom: 16 }}
          >
            Добавить
          </Button>
        )}
      </Flex>
      <Table
        scroll={{ x: true }}
        columns={allColumns}
        dataSource={data}
        rowKey='id'
      />
      {formFields && (onAdd || onEdit) && (
        <Drawer
          title={
            editingRecord ? 'Редактировать запись' : 'Добавить новую запись'
          }
          width={400}
          onClose={closeDrawer}
          open={isDrawerVisible}
          styles={{ body: { paddingBottom: 80 } }}
          footer={
            <div style={{ textAlign: 'right' }}>
              <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
                Отмена
              </Button>
              <Button onClick={handleSubmit} type='primary'>
                Сохранить
              </Button>
            </div>
          }
        >
          <Form form={form} layout='vertical'>
            {formFields.map(
              (field) =>
                (!editingRecord || field.component !== 'Select') && (
                  <Form.Item
                    key={field.name}
                    name={field.name}
                    label={field.label}
                    rules={field.rules}
                  >
                    {renderFormField(field)}
                  </Form.Item>
                )
            )}
          </Form>
        </Drawer>
      )}
    </div>
  )
}

export default CRUDModule
