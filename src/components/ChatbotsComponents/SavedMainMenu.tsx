import { Button, Card, Input, List, Modal } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';


interface SubMenu {
    id: number;
    name: string;
    key: number;
    type: string;
  }
  
  interface Menu {
    id: number;
    name: string;
    type: string;
    key: number;
    children: SubMenu[];
  }


function SavedMainMenu() {

    const [isOpenSubMenuEditModal, setIsOpenSubMenuEditModal] = useState(false);
    const [subMenuModal, setSubMenuModal] = useState(false);
    const [menus, setMenus] = useState<Menu[]>([]);






    const showEditModal = () => {
        setIsOpenSubMenuEditModal(true);
      };

    const handleCancel = () => {
        setIsOpenSubMenuEditModal(false);
      };

    const deleteMenu = (id: number) => {
        setMenus(menus.filter((menu) => menu.id !== id));
      };

    const showSubmenuEditModal = () => {
        setSubMenuModal(true);
      };

    const handleSubmenuCancel = () => {
        setSubMenuModal(false);
      };

    const deleteSubMenu = (menuId: number, subId: number) => {
        setMenus(
          menus.map((menu) =>
            menu.id === menuId
              ? {
                ...menu,
                children: menu.children.filter((child) => child.id !== subId),
              }
              : menu
          )
        );
      };



  return (
    <div>
      <div className="mt-5">
        <h3 className="p-4 text-2xl font-bold underline">Saved Menu Structure</h3>
        {menus.map((menu, index) => (
          <Card
            key={menu.id}
            title={
              <>
                {index + 1}. {menu.name} (Key: {menu.key})
                <EditOutlined
                  style={{ marginLeft: 10 }}
                  onClick={showEditModal}


                />
                <Modal
                  title="Edit Menu"
                  open={isOpenSubMenuEditModal}
                  onCancel={handleCancel}
                  footer={null}

                >
                  {/* Modal ke andar ka content */}
                  {/* <p>Edit content for menu id: {menu?.id}</p> */}
                  <Input
                    type="string"
                    defaultValue={menu.name}
                  />

                  <Input
                    type="number"
                    className="mt-4"
                    defaultValue={menu.key}
                  />

                  <div className="mt-4 flex justify-end">
                    <Button
                      className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"

                    >
                      Edit
                    </Button>    </div>

                </Modal>

                <DeleteOutlined
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteMenu(menu.id)}
                />
              </>
            }
            style={{ marginBottom: 16 }}
          >
            <List
              bordered
              dataSource={menu.children}
              renderItem={(item, idx) => (
                <List.Item
                  actions={[
                    <EditOutlined
                      onClick={showSubmenuEditModal}

                    />,

                    <Modal
                      title="Edit SubMenu"
                      open={subMenuModal}
                      onCancel={handleSubmenuCancel}
                      footer={null}

                    >
                      {/* Modal ke andar ka content */}
                      {/* <p>Edit content for menu id: {menu?.id}</p> */}
                      <Input
                        type="string"
                        defaultValue={menu.name}
                      />

                      <Input
                        type="number"
                        className="mt-4"
                        defaultValue={menu.key}
                      />

                      <div className="mt-4 flex justify-end">
                        <Button
                          className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"

                        >
                          Edit
                        </Button>    </div>

                    </Modal>,

                    <DeleteOutlined
                      key="delete"
                      onClick={() => deleteSubMenu(menu.id, item.id)}
                    />,
                  ]}
                >
                  {idx + 1}. {item.name} (Key: {item.key})
                </List.Item>
              )}
            />

          </Card>
        ))}

        <div
          style={{
            background: "#fff7e6",
            padding: 16,
            marginTop: 16,
            border: "1px solid #ffe58f",
          }}
        >
          The <b>"WhatsApp Interactive Chat Menu"</b> can be started replying
          specific keywords like: <b>Hello, Hi, M, #, Menu</b>. Without these
          keywords, the menu cannot be started.
        </div>
      </div>
    </div>
  )
}

export default SavedMainMenu
