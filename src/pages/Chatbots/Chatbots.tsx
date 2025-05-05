import AddMenu from '@/components/ChatbotsComponents/AddMenu'
import AddSubMenuModal from '@/components/ChatbotsComponents/modals/AddSubMenuModal';
import EditDraftMenuModal from '@/components/ChatbotsComponents/modals/EditDraftMenuModal';
import EditSubMenuModal from '@/components/ChatbotsComponents/modals/EditSubMenuModal';
import { Menu } from '@/lib/types/menu';
import { Button, Card, List, message } from 'antd';
import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddContentModal from '@/components/ChatbotsComponents/modals/AddContentModal';
import { dummySavedMenus } from './dumysavemenu';


const Chatbots:React.FC = () => {
  const [draftMenus, setDraftMenus] = useState<Menu[]>([]);
  const [editDraftMenu, setEditDraftMenu] = useState({ id: null, name: "", key: "" });
  const [isDraftEditModalOpen, setIsDraftEditModalOpen] = useState(false);
  const [isAddSubMenuModalOpen, setIsAddSubMenuModalOpen] = useState(false);
const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
const [subMenuName, setSubMenuName] = useState('');
const [subMenuKey, setSubMenuKey] = useState('');
const [isEditSubMenuModalOpen, setIsEditSubMenuModalOpen] = useState(false);
const [subMenuToEdit, setSubMenuToEdit] = useState<Menu | null>(null);
const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
const [selectedContentMenuId, setSelectedContentMenuId] = useState<number | null>(null);
const [contentType, setContentType] = useState('Text');
const [contentValue, setContentValue] = useState('');
const [editContentInfo, setEditContentInfo] = useState<{
  menuId: number | null;
  contentId: number | null;
} | null>(null);
const [savedMenus, setSavedMenus] = useState<Menu[]>([]);
const openAddContentModal = (menuId: number) => {
  setSelectedContentMenuId(menuId);
  setContentType('Text');
  setContentValue('');
  setIsAddContentModalOpen(true);
};
const handleEditContent = (menuId: number, contentId: number) => {
  const findContent = (menus: Menu[]): { type: string; name: string } | null => {
    for (let menu of menus) {
      if (menu.id === menuId && menu.children) {
        const content = menu.children.find((c) => c.id === contentId);
        if (content) return content;
      }
      if (menu.subMenus) {
        const result = findContent(menu.subMenus);
        if (result) return result;
      }
    }
    return null;
  };

  const content = findContent(draftMenus);
  if (content) {
    setSelectedContentMenuId(menuId);
    setContentType(content.type);
    setContentValue(content.name);
    setEditContentInfo({ menuId, contentId });
    setIsAddContentModalOpen(true);
  }
};

const addContentToMenu = (menus: Menu[]): Menu[] => {
  return menus.map(menu => {
    if (menu.id === selectedContentMenuId) {
      const updatedChildren = menu.children ? [...menu.children] : [];

      if (editContentInfo) {
        // 📝 Editing existing content
        const index = updatedChildren.findIndex(c => c.id === editContentInfo.contentId);
        if (index !== -1) {
          updatedChildren[index] = {
            ...updatedChildren[index],
            type: contentType,
            name: contentValue,
          };
        }
      } else {
        // ➕ Adding new content
        const newContent = {
          id: Date.now(),
          type: contentType,
          name: contentValue,
        };
        updatedChildren.push(newContent);
      }

      return { ...menu, children: updatedChildren };
    }

    if (menu.subMenus) {
      return { ...menu, subMenus: addContentToMenu(menu.subMenus) };
    }

    return menu;
  });
};


const handleAddContent = () => {
  setDraftMenus(prevMenus => addContentToMenu(prevMenus));
  setIsAddContentModalOpen(false);
  setEditContentInfo(null); // reset edit info
};


const handleSaveMenu = (menuId: number) => {
  const menuToSave = draftMenus.find(menu => menu.id === menuId);
  if (!menuToSave) return;

  // Optionally avoid duplicates by checking if already saved
  const alreadySaved = savedMenus.some(menu => menu.id === menuId);
  if (alreadySaved) {
    message.info("Menu already saved.");
    return;
  }

  setSavedMenus(prev => [...prev, menuToSave]);
  setDraftMenus(prev => prev.filter(menu => menu.id !== menuId));
  message.success("Menu saved successfully!");
};
const deleteContentRecursively = (menus: Menu[], menuId: number, contentId: number): Menu[] => {
  return menus.map(menu => {
    if (menu.id === menuId && menu.children) {
      return {
        ...menu,
        children: menu.children.filter(child => child.id !== contentId),
      };
    }
    if (menu.subMenus) {
      return {
        ...menu,
        subMenus: deleteContentRecursively(menu.subMenus, menuId, contentId),
      };
    }
    return menu;
  });
};

const handleDeleteContent = (menuId: number, contentId: number) => {
  const updatedMenus = deleteContentRecursively(draftMenus, menuId, contentId);
  setDraftMenus(updatedMenus);
  message.success("Content deleted.");
};




const handleEditSubMenu = (menu: Menu) => {
  setSubMenuToEdit(menu);
  setIsEditSubMenuModalOpen(true);
};
const openAddSubMenuModal = (menuId: number) => {
  setSelectedMenuId(menuId);
  setSubMenuName('');
  setSubMenuKey('');
  setIsAddSubMenuModalOpen(true);
};



const handleAddSubMenu = (name: string, key: string) => {
  if (!selectedMenuId) return;
  
  const addSubMenuRecursively = (menus: Menu[]): Menu[] => {
    return menus.map(menu => {
      if (menu.id === selectedMenuId) {
        const newSubMenu = {
          id: Date.now().toString(),
          name,
          key,
          subMenus: [],
        };
        const updatedSubMenus = menu.subMenus ? [...menu.subMenus, newSubMenu] : [newSubMenu];
        return { ...menu, subMenus: updatedSubMenus };
      }
      if (menu.subMenus) {
        return { ...menu, subMenus: addSubMenuRecursively(menu.subMenus) };
      }
      return menu;
    });
  };

  setDraftMenus(prevMenus => addSubMenuRecursively(prevMenus));
  setIsAddSubMenuModalOpen(false);
};

  const showDraftEditModal = (menu:any) => {
    setEditDraftMenu(menu);
    setIsDraftEditModalOpen(true);
  };
  const handleUpdateDraftMenu = () => {
    const updated = draftMenus.map(menu =>
      menu.id === editDraftMenu.id ? { ...menu, name: editDraftMenu.name, key: editDraftMenu.key } : menu
    );
    setDraftMenus(updated);
    setIsDraftEditModalOpen(false);
  };
  const deleteDraftMenu = (id:any) => {
    const filtered = draftMenus.filter(menu => menu.id !== id);
    setDraftMenus(filtered);
  };
  const renderSubMenus = (menus: Menu[], isSavedView: boolean = false) => {
    return menus.map((menu) => (
      <Card key={menu.id} className="border  mt-4  rounded">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">{menu.name} (Key: {menu.key})</p>
          </div>
          <div className="flex gap-2">
            <EditOutlined
              className="text-green-700 cursor-pointer hover:scale-110 transition"
              onClick={() => handleEditSubMenu(menu)}
            />
            <DeleteOutlined
              className="text-red-500 cursor-pointer hover:scale-110 transition"
              onClick={() => handleDeleteSubMenu(menu.id)}
            />
          </div>
        </div>
  
        {/* ➕ Add Content & Submenu Buttons */}
        {!isSavedView && (
        <div className="mt-3 flex gap-4 flex-wrap">
          <Button onClick={() => openAddSubMenuModal(menu.id)} className="!bg-green-700 !text-white active:!scale-110">
            Add SubMenu
          </Button>
          <Button onClick={() => openAddContentModal(menu.id)} className="!bg-green-700 !text-white active:!scale-110">
            Add content
          </Button>
        </div>
      )}
        {/* 📄 Show contents */}
        {menu.children && menu.children.length > 0 && (
          <List
  size="small"
  className="my-3"
  bordered
  dataSource={menu.children}
  renderItem={(child, cidx) => (
    <List.Item className="!p-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <span className="font-semibold">{cidx + 1}.</span>
          {child.type === "Text" ? (
            <span>{child.name}</span>
          ) : child.type === "Image" ? (
            <img
              src={child.name}
              alt="img"
              className="w-[100px] h-[60px] object-cover rounded border"
            />
          ) : (
            <a
              href={child.name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Document
            </a>
          )}
        </div>
        
                  <div className="flex items-center gap-3">
                    <EditOutlined
                      onClick={() => handleEditContent(menu.id, child.id)}
                      className="text-green-700 cursor-pointer hover:scale-110 transition"
                    />
                    <DeleteOutlined
                      className="text-red-500 cursor-pointer hover:scale-110 transition"
                      onClick={() => handleDeleteContent(menu.id, child.id)}
                    />
                  </div>
              
      </div>
    </List.Item>
  )}
/>

        )}
  
        {/* 🔁 Recursive Submenus */}
        {menu.subMenus && renderSubMenus(menu.subMenus, isSavedView)}
      </Card>
    ));
  };
  
const updateSubMenuRecursively = (menus: Menu[]): Menu[] => {
  return menus.map(menu => {
    if (menu.id === subMenuToEdit?.id) {
      return {
        ...menu,
        name: subMenuToEdit.name,
        key: subMenuToEdit.key,
      };
    }
    if (menu.subMenus) {
      return {
        ...menu,
        subMenus: updateSubMenuRecursively(menu.subMenus),
      };
    }
    return menu;
  });
};

const handleEditSubMenuSave = () => {
  const updatedMenus = updateSubMenuRecursively(draftMenus);
  setDraftMenus(updatedMenus);
  setIsEditSubMenuModalOpen(false);
};
const deleteSubMenuRecursively = (menus: Menu[], idToDelete: number): Menu[] => {
  return menus
    .map(menu => ({
      ...menu,
      subMenus: menu.subMenus ? deleteSubMenuRecursively(menu.subMenus, idToDelete) : [],
    }))
    .filter(menu => menu.id !== idToDelete);
};

const handleDeleteSubMenu = (id: number) => {
  const updated = deleteSubMenuRecursively(draftMenus, id);
  setDraftMenus(updated);
};

  
  return (
    <div className="bg-white rounded-2xl mt-7 shadow p-8">
      <h2 className="text-lg">Menu Management</h2>
      <hr className="mt-3 mb-5" />
      {/* Menu Type & Input Section */}
      <div>
      <AddMenu draftMenus={draftMenus} setDraftMenus={setDraftMenus} />
    </div>
    {/* Draft Menus */}
    {draftMenus.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-5">📝 Draft Menus</h3>
          <List
            bordered
            dataSource={draftMenus}
            renderItem={(menu, idx) => (
              <div key={menu.id} className="p-4 rounded-md shadow-sm">
                {/* Top Level Menu Info */}
                <div className="flex justify-between items-center">
                  <List.Item className="!border-none !p-0">
                    <span className="font-medium">
                      {idx + 1}. {menu.name} (Key: {menu.key})
                    </span>
                  </List.Item>

                  <div className="flex gap-2">
                    <Button onClick={() => showDraftEditModal(menu)} className="!bg-green-700 !text-white hover:scale-105 transition">Edit</Button>
                    <Button onClick={() => deleteDraftMenu(menu.id)} className="!bg-red-500 !text-white hover:scale-105 transition">Delete</Button>
                  </div>
                </div>
                {/* <h1 className='text-xl font-bold underline'>SubMenus:</h1> */}
                {menu.subMenus && menu.subMenus.length > 0 && (
                 <div className="ml-4 mt-4">
                 {renderSubMenus(menu.subMenus)}
               </div>
                  )}
                  <div className="space-y-3 mt-3">
  {menu.children?.map((child, cidx) => (
    <Card key={child.id} className="ml-4">
      <div className="flex justify-between items-center ">
        <div className='flex gap-1'>
          <div className="text-sm text-gray-500">{cidx + 1}.</div>
          {child.type === "Text" ? (
            <div className="text-sm text-gray-800">{child.name}</div>
          ) : child.type === "Image" ? (
            <img
              src={child.name}
              alt="img"
              className="max-w-[100px] max-h-[60px] rounded"
            />
          ) : (
            <a
              href={child.name}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Document
            </a>
          )}
        </div>

        <div className="flex gap-2">
          <EditOutlined
           onClick={() => handleEditContent(menu.id, child.id)}
           className="text-green-700 cursor-pointer hover:scale-110 transition" />
          <DeleteOutlined
            className="text-red-500 cursor-pointer hover:scale-110 transition"
            onClick={() => handleDeleteContent(menu.id, child.id)}
          />
        </div>
      </div>
    </Card>
  ))}
</div>

                  
                <div className="flex gap-4 mt-5 flex-col md:flex-row">
                  <Button
                    className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                    onClick={() => openAddSubMenuModal(menu.id)}
                  >
                    Add Sub Menu
                  </Button>
                  <Button
                    className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                     onClick={() => openAddContentModal(menu.id)}
                  >
                    Add Conetnt
                  </Button>
                  <Button
                    className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
                    onClick={() => handleSaveMenu(menu.id)}
                  >
                    Save Menu
                  </Button>
                  
                </div>
                
              </div>
              
            )}
            
          />

        </div>
      )}
             {/* Saved Menus Section */}
       <div className="mt-5">
        <h3 className="p-4 text-2xl font-bold underline">Saved Menu Structure</h3>
        
        {/* {dummySavedMenus.length > 0 ? (
        dummySavedMenus.map((menu, idx) => (
          <Card
            key={menu.id}
            title={`${idx + 1}. ${menu.name} (Key: ${menu.key})`}
            style={{ marginBottom: 16 }}
            extra={
              <div className="flex gap-2">
                <Button className="!bg-green-700 !text-white">Edit</Button>
                <Button className="!bg-red-500 !text-white">Delete</Button>
              </div>
            }
          >
            {menu.subMenus && renderSubMenus(menu.subMenus, true)}

            {menu.children && menu.children.length > 0 && (
              <List
                size="small"
                bordered
                className="mt-3"
                dataSource={menu.children}
                renderItem={(child: any, cidx: number) => (
                  <List.Item className="!p-3">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">{cidx + 1}.</span>
                        {child.type === "Text" ? (
                          <span>{child.name}</span>
                        ) : child.type === "Image" ? (
                          <img
                            src={child.name}
                            alt="img"
                            className="w-[100px] h-[60px] object-cover rounded border"
                          />
                        ) : (
                          <a
                            href={child.name}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Document
                          </a>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <EditOutlined
                          onClick={() => handleEditContent(menu.id, child.id)}
                          className="text-green-700 cursor-pointer hover:scale-110 transition"
                        />
                        <DeleteOutlined
                          onClick={() => handleDeleteContent(menu.id, child.id)}
                          className="text-red-500 cursor-pointer hover:scale-110 transition"
                        />
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            )}
          </Card>
        ))
      ) : (
        <p className="text-gray-500 italic">No saved menus yet.</p>
      )} */}
        {savedMenus.length > 0 ? (
  savedMenus.map((menu, idx) => (
    <Card
      key={menu.id}
      title={`${idx + 1}. ${menu.name} (Key: ${menu.key})`}
      style={{ marginBottom: 16 }}
      extra={
        <div className="flex gap-2">
          <Button className="!bg-green-700 !text-white">Edit</Button>
          <Button className="!bg-red-500 !text-white">Delete</Button>
        </div>
      }
    >
      {menu.subMenus && menu.subMenus.length > 0 && (
        <div className="mb-4">
          {renderSubMenus(menu.subMenus, true)}
        </div>
      )}

      
      {menu.children && menu.children.length > 0 && (
  <List
    size="small"
    bordered
    dataSource={menu.children}
    renderItem={(child, cidx) => (
      <List.Item className="!p-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <span className="font-semibold">{cidx + 1}.</span>
            {child.type === "Text" ? (
              <span>{child.name}</span>
            ) : child.type === "Image" ? (
              <img
                src={child.name}
                alt="saved-img"
                className="max-w-[100px] max-h-[60px] object-cover rounded border"
              />
            ) : (
              <a
                href={child.name}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Document
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            <EditOutlined
              onClick={() => handleEditContent(menu.id, child.id)}
              className="text-green-700 cursor-pointer hover:scale-110 transition"
            />
            <DeleteOutlined
              onClick={() => handleDeleteContent(menu.id, child.id)}
              className="text-red-500 cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>
      </List.Item>
    )}
  />
)}

    </Card>
  ))
) : (
  <p className="text-gray-500 italic">No saved menus yet.</p>
)}

       

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
      
      <EditDraftMenuModal
        visible={isDraftEditModalOpen}
        editDraftMenu={editDraftMenu}
        setEditDraftMenu={setEditDraftMenu}
        onOk={handleUpdateDraftMenu}
        onCancel={() => setIsDraftEditModalOpen(false)}
      />
      <AddSubMenuModal
  visible={isAddSubMenuModalOpen}
  onOk={handleAddSubMenu}
  onCancel={() => setIsAddSubMenuModalOpen(false)}
  name={subMenuName}
  setName={setSubMenuName}
  menuKey={subMenuKey}
  setMenuKey={setSubMenuKey}
/>
<EditSubMenuModal
  visible={isEditSubMenuModalOpen}
  subMenuToEdit={subMenuToEdit}
  setSubMenuToEdit={setSubMenuToEdit}
  onOk={handleEditSubMenuSave}
  onCancel={() => setIsEditSubMenuModalOpen(false)}
/>

 <AddContentModal
            open={isAddContentModalOpen}
            contentType={contentType}
            contentValue={contentValue}
            setContentType={setContentType}
            setContentValue={setContentValue}
            onOk={handleAddContent}
            onCancel={() => {
              setIsAddContentModalOpen(false)
              setEditContentInfo(null);
    }
            }
            editContentInfo={editContentInfo}
  setEditContentInfo={setEditContentInfo}
/>


    </div>
  )
}

export default Chatbots















// import AddMenu from '@/components/ChatbotsComponents/AddMenu'
// import AddSubMenuModal from '@/components/ChatbotsComponents/modals/AddSubMenuModal';
// import EditDraftMenuModal from '@/components/ChatbotsComponents/modals/EditDraftMenuModal';
// import EditSubMenuModal from '@/components/ChatbotsComponents/modals/EditSubMenuModal';
// import { Menu } from '@/lib/types/menu';
// import { Button, Card, List, message } from 'antd';
// import React, { useState } from 'react'
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import AddContentModal from '@/components/ChatbotsComponents/modals/AddContentModal';
// import AddNestedContentModal from '@/components/ChatbotsComponents/modals/AddNestedContentModal';

// const Chatbots:React.FC = () => {
//   const [draftMenus, setDraftMenus] = useState<Menu[]>([]);
//   const [editDraftMenu, setEditDraftMenu] = useState({ id: null, name: "", key: "" });
//   const [isDraftEditModalOpen, setIsDraftEditModalOpen] = useState(false);
//   const [isAddSubMenuModalOpen, setIsAddSubMenuModalOpen] = useState(false);
// const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
// const [subMenuName, setSubMenuName] = useState('');
// const [subMenuKey, setSubMenuKey] = useState('');
// const [isEditSubMenuModalOpen, setIsEditSubMenuModalOpen] = useState(false);
// const [subMenuToEdit, setSubMenuToEdit] = useState<Menu | null>(null);
// const [isContentModalOpen, setIsContentModalOpen] = useState(false);
// const [contentType, setContentType] = useState<"Text" | "Image" | "Document">("Text");
// const [contentValue, setContentValue] = useState<string>("");
// const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);
// const [isEditingContent, setIsEditingContent] = useState(false);
// const [contentIdBeingEdited, setContentIdBeingEdited] = useState<number | null>(null);
// const [savedMenus, setSavedMenus] = useState<Menu[]>([]);

// const handleSaveMenu = (menuId: number) => {
//   const menuToSave = draftMenus.find(menu => menu.id === menuId);
//   if (!menuToSave) return;

//   // Optionally avoid duplicates by checking if already saved
//   const alreadySaved = savedMenus.some(menu => menu.id === menuId);
//   if (alreadySaved) {
//     message.info("Menu already saved.");
//     return;
//   }

//   setSavedMenus(prev => [...prev, menuToSave]);
//   setDraftMenus(prev => prev.filter(menu => menu.id !== menuId));
//   message.success("Menu saved successfully!");
// };




// const handleAddContent = () => {
//   if (contentType === "Text" && !contentValue) {
//     message.error("Please enter content.");
//     return;
//   }

//   const updatedDraftMenus = draftMenus.map((menu) => {
//     if (menu.id === currentMenuId) {
//       const updatedChildren = isEditingContent
//         ? menu.children.map((child) =>
//             child.id === contentIdBeingEdited
//               ? { ...child, name: contentValue, type: contentType }
//               : child
//           )
//         : [
//             ...menu.children,
//             {
//               id: Date.now(),
//               name: contentValue || `${contentType} file`,
//               key: Math.floor(Math.random() * 100),
//               type: contentType,
//             },
//           ];
//       return { ...menu, children: updatedChildren };
//     }
//     return menu;
//   });

//   setDraftMenus(updatedDraftMenus);
//   setContentValue("");
//   setIsContentModalOpen(false);
//   setIsEditingContent(false);
//   setContentIdBeingEdited(null);
//   message.success(isEditingContent ? "Content updated." : "Content added.");
// };

// const hanldeNestedContentModal = (menuId: number, content?: any) => {
//   setCurrentMenuId(menuId);
//   setIsContentModalOpen(true);
//   if (content) {
//     setContentType(content.type);
//     setContentValue(content.name);
//     setContentIdBeingEdited(content.id);
//     setIsEditingContent(true);
//   } else {
//     setContentType("Text");
//     setContentValue("");
//     setContentIdBeingEdited(null);
//     setIsEditingContent(false);
//   } 
// }


// const showContentModal = (menuId: number, content?: any) => {
//   setCurrentMenuId(menuId);
//   setIsContentModalOpen(true);
//   if (content) {
//     setContentType(content.type);
//     setContentValue(content.name);
//     setContentIdBeingEdited(content.id);
//     setIsEditingContent(true);
//   } else {
//     setContentType("Text");
//     setContentValue("");
//     setContentIdBeingEdited(null);
//     setIsEditingContent(false);
//   }
// };
// const handleDeleteContent = (menuId: number, contentId: number) => {
//   const updatedMenus = draftMenus.map(menu => {
//     if (menu.id === menuId) {
//       return {
//         ...menu,
//         children: menu.children.filter(child => child.id !== contentId),
//       };
//     }
//     return menu;
//   });
//   setDraftMenus(updatedMenus);
//   message.success("Content deleted.");
// };

// const handleEditSubMenu = (menu: Menu) => {
//   setSubMenuToEdit(menu);
//   setIsEditSubMenuModalOpen(true);
// };
// const openAddSubMenuModal = (menuId: number) => {
//   setSelectedMenuId(menuId);
//   setSubMenuName('');
//   setSubMenuKey('');
//   setIsAddSubMenuModalOpen(true);
// };



// const handleAddSubMenu = (name: string, key: string) => {
//   if (!selectedMenuId) return;
  
//   const addSubMenuRecursively = (menus: Menu[]): Menu[] => {
//     return menus.map(menu => {
//       if (menu.id === selectedMenuId) {
//         const newSubMenu = {
//           id: Date.now().toString(),
//           name,
//           key,
//           subMenus: [],
//         };
//         const updatedSubMenus = menu.subMenus ? [...menu.subMenus, newSubMenu] : [newSubMenu];
//         return { ...menu, subMenus: updatedSubMenus };
//       }
//       if (menu.subMenus) {
//         return { ...menu, subMenus: addSubMenuRecursively(menu.subMenus) };
//       }
//       return menu;
//     });
//   };

//   setDraftMenus(prevMenus => addSubMenuRecursively(prevMenus));
//   setIsAddSubMenuModalOpen(false);
// };

//   const showDraftEditModal = (menu:any) => {
//     setEditDraftMenu(menu);
//     setIsDraftEditModalOpen(true);
//   };
//   const handleUpdateDraftMenu = () => {
//     const updated = draftMenus.map(menu =>
//       menu.id === editDraftMenu.id ? { ...menu, name: editDraftMenu.name, key: editDraftMenu.key } : menu
//     );
//     setDraftMenus(updated);
//     setIsDraftEditModalOpen(false);
//   };
//   const deleteDraftMenu = (id:any) => {
//     const filtered = draftMenus.filter(menu => menu.id !== id);
//     setDraftMenus(filtered);
//   };
//   const renderSubMenus = (menus: Menu[]) => {
//     return menus.map((menu) => (
//       <div key={menu.id} className="border border-gray-500 p-4 mt-4 ml-4 rounded">
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-medium">{menu.name} (Key: {menu.key})</p>
//           </div>
//           <div className="flex gap-2">
//             <EditOutlined
//               className="text-green-700 cursor-pointer hover:scale-110 transition"
//               onClick={() => handleEditSubMenu(menu)}
//             />
//             <DeleteOutlined
//               className="text-red-500 cursor-pointer hover:scale-110 transition"
//               onClick={() => handleDeleteSubMenu(menu.id)}
//             />
//           </div>
//         </div>
  
//         {/* ➕ Add Content & Submenu Buttons */}
//         <div className="mt-3 flex gap-4 flex-wrap">
//           <Button onClick={() => hanldeNestedContentModal(menu.id)} className="!bg-green-700 !text-white active:!scale-110">
//             Add Content
//           </Button>
//           <Button onClick={() => openAddSubMenuModal(menu.id)} className="!bg-green-700 !text-white active:!scale-110">
//             Add SubMenu
//           </Button>
//         </div>
  
//         {/* 📄 Show contents */}
//         {menu.children && menu.children.length > 0 && (
//           <List
//             size="small"
//             className="my-3"
//             bordered
//             dataSource={menu.children}
//             renderItem={(child, cidx) => (
//               <List.Item
//                 actions={[
//                   <EditOutlined
//                     className="text-green-700 cursor-pointer hover:scale-110 transition"
//                     onClick={() => showContentModal(menu.id, child)}
//                   />,
//                   <DeleteOutlined
//                     className="text-red-500 cursor-pointer hover:scale-110 transition"
//                     onClick={() => handleDeleteContent(menu.id, child.id)}
//                   />
//                 ]}
//               >
//                 {cidx + 1}.{" "}
//                 {child.type === "Text" ? (
//                   <span>{child.name}</span>
//                 ) : child.type === "Image" ? (
//                   <img src={child.name} alt="img" className="max-w-[100px] max-h-[60px] rounded" />
//                 ) : (
//                   <a href={child.name} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//                     View Document
//                   </a>
//                 )}
//               </List.Item>
//             )}
//           />
//         )}
  
//         {/* 🔁 Recursive Submenus */}
//         {menu.subMenus && renderSubMenus(menu.subMenus)}
//       </div>
//     ));
//   };
  
// const updateSubMenuRecursively = (menus: Menu[]): Menu[] => {
//   return menus.map(menu => {
//     if (menu.id === subMenuToEdit?.id) {
//       return {
//         ...menu,
//         name: subMenuToEdit.name,
//         key: subMenuToEdit.key,
//       };
//     }
//     if (menu.subMenus) {
//       return {
//         ...menu,
//         subMenus: updateSubMenuRecursively(menu.subMenus),
//       };
//     }
//     return menu;
//   });
// };

// const handleEditSubMenuSave = () => {
//   const updatedMenus = updateSubMenuRecursively(draftMenus);
//   setDraftMenus(updatedMenus);
//   setIsEditSubMenuModalOpen(false);
// };
// const deleteSubMenuRecursively = (menus: Menu[], idToDelete: number): Menu[] => {
//   return menus
//     .map(menu => ({
//       ...menu,
//       subMenus: menu.subMenus ? deleteSubMenuRecursively(menu.subMenus, idToDelete) : [],
//     }))
//     .filter(menu => menu.id !== idToDelete);
// };

// const handleDeleteSubMenu = (id: number) => {
//   const updated = deleteSubMenuRecursively(draftMenus, id);
//   setDraftMenus(updated);
// };

  
//   return (
//     <div className="bg-white rounded-2xl mt-7 shadow p-8">
//       <h2 className="text-lg">Menu Management</h2>
//       <hr className="mt-3 mb-5" />
//       {/* Menu Type & Input Section */}
//       <div>
//       <AddMenu draftMenus={draftMenus} setDraftMenus={setDraftMenus} />
//     </div>
//     {/* Draft Menus */}
//     {draftMenus.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-5">📝 Draft Menus</h3>
//           <List
//             bordered
//             dataSource={draftMenus}
//             renderItem={(menu, idx) => (
//               <div key={menu.id} className="p-4 rounded-md shadow-sm">
//                 {/* Top Level Menu Info */}
//                 <div className="flex justify-between items-center">
//                   <List.Item className="!border-none !p-0">
//                     <span className="font-medium">
//                       {idx + 1}. {menu.name} (Key: {menu.key})
//                     </span>
//                   </List.Item>

//                   <div className="flex gap-2">
//                     <Button onClick={() => showDraftEditModal(menu)} className="!bg-green-700 !text-white hover:scale-105 transition">Edit</Button>
//                     <Button onClick={() => deleteDraftMenu(menu.id)} className="!bg-red-500 !text-white hover:scale-105 transition">Delete</Button>
//                   </div>
//                 </div>
//                 <h1 className='text-xl font-bold underline'>SubMenus:</h1>
//                 {menu.subMenus && menu.subMenus.length > 0 && (
//                  <div className="ml-6 mt-4">
//                  {renderSubMenus(menu.subMenus)}
//                </div>
//                   )}
//                   <h1 className='text-xl font-bold underline'>Contents:</h1>
//                 {menu.children && menu.children.length > 0 && (
//                   <List
//                     size="small"
//                     bordered
//                     className="my-4"
//                     dataSource={menu.children}
//                     renderItem={(child, cidx) => (
//                       <List.Item
//                         actions={[
//                           <div className="flex gap-2 justify-end">
//                             <EditOutlined
//   className="text-green-700 cursor-pointer hover:scale-110 transition"
//   onClick={() => showContentModal(menu.id, child)}
// />
      
//                             <DeleteOutlined
//                               className="text-red-500 cursor-pointer hover:scale-110 transition"
//                               onClick={() => handleDeleteContent(menu.id, child.id)}
//                             />
//                           </div>
//                         ]}
//                       >
//                         {cidx + 1}.{" "}
//                         {child.type === "Text" ? (
//                           <span>{child.name}</span>
//                         ) : child.type === "Image" ? (
//                           <img
//                             src={child.name}
//                             alt="draft-img"
//                             className="max-w-[100px] max-h-[60px] rounded"
//                           />
//                         ) : (
//                           <a
//                             href={child.name}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             View Document
//                           </a>
//                         )}
//                       </List.Item>
//                     )}
//                   />
//                 )}
//                 <div className="flex gap-4 mt-5 flex-col md:flex-row">
//                   <Button
//                     className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
//                     onClick={() => showContentModal(menu.id)}
//                   >
//                     Add Content
//                   </Button>
//                   <Button
//                     className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
//                     onClick={() => openAddSubMenuModal(menu.id)}
//                   >
//                     Add Sub Menu
//                   </Button>
//                   <Button
//                     className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
//                     onClick={() => handleSaveMenu(menu.id)}
//                   >
//                     Save Menu
//                   </Button>
                  
//                 </div>
                
//               </div>
              
//             )}
            
//           />

//         </div>
//       )}
//        {/* Saved Menus Section */}
//        <div className="mt-5">
//         <h3 className="p-4 text-2xl font-bold underline">Saved Menu Structure</h3>
        
//         {savedMenus.length > 0 ? (
//   savedMenus.map((menu, idx) => (
//     <Card
//       key={menu.id}
//       title={`${idx + 1}. ${menu.name} (Key: ${menu.key})`}
//       style={{ marginBottom: 16 }}
//       extra={
//         <div className="flex gap-2">
//           <Button className="!bg-green-700 !text-white">Edit</Button>
//           <Button className="!bg-red-500 !text-white">Delete</Button>
//         </div>
//       }
//     >
//       {menu.subMenus && menu.subMenus.length > 0 && (
//         <div className="mb-4">
//           <h4 className="font-bold text-lg underline">SubMenus</h4>
//           {renderSubMenus(menu.subMenus)}
//         </div>
//       )}

//       {/* Contents */}
//       {menu.children && menu.children.length > 0 && (
//         <div>
//           <h4 className="font-bold text-lg underline">Contents</h4>
//           <List
//             size="small"
//             bordered
//             dataSource={menu.children}
//             renderItem={(child, cidx) => (
//               <List.Item>
//                 {cidx + 1}.{" "}
//                 {child.type === "Text" ? (
//                   <span>{child.name}</span>
//                 ) : child.type === "Image" ? (
//                   <img
//                     src={child.name}
//                     alt="saved-img"
//                     className="max-w-[100px] max-h-[60px] rounded"
//                   />
//                 ) : (
//                   <a
//                     href={child.name}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 underline"
//                   >
//                     View Document
//                   </a>
//                 )}
//               </List.Item>
//             )}
//           />
//         </div>
//       )}
//     </Card>
//   ))
// ) : (
//   <p className="text-gray-500 italic">No saved menus yet.</p>
// )}

       

//         <div
//           style={{
//             background: "#fff7e6",
//             padding: 16,
//             marginTop: 16,
//             border: "1px solid #ffe58f",
//           }}
//         >
//           The <b>"WhatsApp Interactive Chat Menu"</b> can be started replying
//           specific keywords like: <b>Hello, Hi, M, #, Menu</b>. Without these
//           keywords, the menu cannot be started.
//         </div>
//       </div>
//       <EditDraftMenuModal
//         visible={isDraftEditModalOpen}
//         editDraftMenu={editDraftMenu}
//         setEditDraftMenu={setEditDraftMenu}
//         onOk={handleUpdateDraftMenu}
//         onCancel={() => setIsDraftEditModalOpen(false)}
//       />
//       <AddSubMenuModal
//   visible={isAddSubMenuModalOpen}
//   onOk={handleAddSubMenu}
//   onCancel={() => setIsAddSubMenuModalOpen(false)}
//   name={subMenuName}
//   setName={setSubMenuName}
//   menuKey={subMenuKey}
//   setMenuKey={setSubMenuKey}
// />
// <EditSubMenuModal
//   visible={isEditSubMenuModalOpen}
//   subMenuToEdit={subMenuToEdit}
//   setSubMenuToEdit={setSubMenuToEdit}
//   onOk={handleEditSubMenuSave}
//   onCancel={() => setIsEditSubMenuModalOpen(false)}
// />
// {/* Modal for Content Add */}
// <AddContentModal
//             open={isContentModalOpen}
//             contentType={contentType}
//             contentValue={contentValue}
//             setContentType={setContentType}
//             setContentValue={setContentValue}
//             onOk={handleAddContent}
//             onCancel={() => setIsContentModalOpen(false)}
// />
// {/* Modal for add Nested Content Add */}
// <AddNestedContentModal
//             open={isContentModalOpen}
//             contentType={contentType}
//             contentValue={contentValue}
//             setContentType={setContentType}
//             setContentValue={setContentValue}
//             onOk={handleAddContent}
//             onCancel={() => setIsContentModalOpen(false)}
// />

//     </div>
//   )
// }

// export default Chatbots

// import { Button, Card, List, message,} from "antd";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import AddMenu from "@/components/ChatbotsComponents/AddMenu";
// import { Menu } from "@/lib/types/menu";
// import AddContentModal from "@/components/ChatbotsComponents/modals/AddContentModal";
// import EditSubMenuModal from "@/components/ChatbotsComponents/modals/EditSubMenuModal";
// import EditDraftMenuModal from "@/components/ChatbotsComponents/modals/EditDraftMenuModal";
// import MenuKeyModal from "@/components/ChatbotsComponents/modals/MenuKeyModal";
// import AddSubMenuModal from "@/components/ChatbotsComponents/modals/AddSubMenuModal";
// import EditMenuModal from "@/components/ChatbotsComponents/modals/EditMenuModal";
// import EditSaveSubMenu from "@/components/ChatbotsComponents/modals/EditSaveSubMenu";

// const Chatbots: React.FC = () => {
//   const [menuType, setMenuType] = useState<string>("Normal");
//   const [menuName, setMenuName] = useState<string>("");
//   const [menus, setMenus] = useState<Menu[]>([]);
//   const [draftMenus, setDraftMenus] = useState<Menu[]>([]);

//   const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
//   const [isSubMenuModalOpen, setIsSubMenuModalOpen] = useState(false);
//   const [isContentModalOpen, setIsContentModalOpen] = useState(false);

//   const [isOpenSubMenuEditModal, setIsOpenSubMenuEditModal] = useState(false);
//   const [subMenuModal, setSubMenuModal] = useState(false);

//   const [contentType, setContentType] = useState<"Text" | "Image" | "Document">("Text");
//   const [contentValue, setContentValue] = useState<string>("");

//   const [menuKey, setMenuKey] = useState<number | null>(null);
//   const [subMenuKey, setSubMenuKey] = useState<number | null>(null);
//   const [subMenuName, setSubMenuName] = useState<string>("");

//   const [isDraftEditModalOpen, setIsDraftEditModalOpen] = useState(false);
//   const [editDraftMenu, setEditDraftMenu] = useState({ id: null, name: "", key: "" });

//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [editModeType, setEditModeType] = useState(""); // "submenu" or "content"
//   const [editItem, setEditItem] = useState({ menuId: null, id: null, name: "", type: "" });

//   const [currentMenuId, setCurrentMenuId] = useState<number | null>(null);

 
//   const handleConfirmAddMenu = () => {
//     if (!menuKey || menuKey < 1 || menuKey > 99) {
//       message.error("Menu key must be between 1 and 99.");
//       return;
//     }

//     const newMenu: Menu = {
//       id: Date.now(),
//       name: menuName,
//       type: menuType,
//       key: menuKey,
//       children: [],
//     };

//     setDraftMenus([...draftMenus, newMenu]);
//     setMenuName("");
//     setMenuKey(null);
//     setIsMenuModalOpen(false);
//   };

//   const showDraftEditModal = (menu:any) => {
//   setEditDraftMenu(menu);
//   setIsDraftEditModalOpen(true);
// };

// const handleUpdateDraftMenu = () => {
//   const updated = draftMenus.map(menu =>
//     menu.id === editDraftMenu.id ? { ...menu, name: editDraftMenu.name, key: editDraftMenu.key } : menu
//   );
//   setDraftMenus(updated);
//   setIsDraftEditModalOpen(false);
// };

// const deleteDraftMenu = (id:any) => {
//   const filtered = draftMenus.filter(menu => menu.id !== id);
//   setDraftMenus(filtered);
// };
//   const saveDraftToMenus = () => {
//     setMenus([...menus, ...draftMenus]);
//     setDraftMenus([]);
//     message.success("Menu saved successfully.");
//   };

//   const deleteMenu = (id: number) => {
//     setMenus(menus.filter((menu) => menu.id !== id));
//   };

//   const deleteSubMenu = (menuId: number, subId: number) => {
//     setMenus(
//       menus.map((menu) =>
//         menu.id === menuId
//           ? {
//             ...menu,
//             children: menu.children.filter((child) => child.id !== subId),
//           }
//           : menu
//       )
//     );
//   };
//   const deleteSubbb = (menuId: number, subId: number) => {
//     const updatedMenus = draftMenus.map(menu => {
//       if (menu.id === menuId) {
//         return {
//           ...menu,
//           children: menu.children.filter(child => child.id !== subId),
//         };
//       }
//       return menu;
//     });

//     setDraftMenus(updatedMenus);
//   };

//   const showContentModal = (menuId: number) => {
//     setCurrentMenuId(menuId);
//     setIsContentModalOpen(true);
//     setContentType("Text");
//     setContentValue("");
//   };

//   const showSubMenuModal = (menuId: number) => {
//     setCurrentMenuId(menuId);
//     setIsSubMenuModalOpen(true);
//   };

//   const handleAddContent = () => {
//     if (contentType === "Text" && !contentValue) {
//       message.error("Please enter content.");
//       return;
//     }

//     const updatedDraftMenus = draftMenus.map((menu) => {
//       if (menu.id === currentMenuId) {
//         return {
//           ...menu,
//           children: [
//             ...menu.children,
//             {
//               id: Date.now(),
//               name: contentValue || `${contentType} file`,
//               key: Math.floor(Math.random() * 100),
//               type: contentType,
//             },
//           ],
//         };
//       }
//       return menu;
//     });

//     setDraftMenus(updatedDraftMenus);
//     setContentValue("");
//     setIsContentModalOpen(false);
//     message.success("Content added to draft menu.");
//   };

//   const handleAddSubMenu = () => {
//     if (!subMenuName) {
//       message.error("Please enter a submenu name.");
//       return;
//     }

//     if (!subMenuKey || subMenuKey < 1 || subMenuKey > 99) {
//       message.error("Submenu key must be between 1 and 99.");
//       return;
//     }

//     const updatedDraftMenus = draftMenus.map((menu) => {
//       if (menu.id === currentMenuId) {
//         return {
//           ...menu,
//           children: [
//             ...menu.children,
//             {
//               id: Date.now(),
//               name: subMenuName,
//               key: subMenuKey,
//               type: "Text", // Default or fixed type since only name/key are input
//             },
//           ],
//         };
//       }
//       return menu;
//     });

//     setDraftMenus(updatedDraftMenus);
//     setSubMenuName("");
//     setSubMenuKey(null);
//     setIsSubMenuModalOpen(false);
//   };
//   const showEditModal = () => {
//     setIsOpenSubMenuEditModal(true);
//   };

//   const handleCancel = () => {
//     setIsOpenSubMenuEditModal(false);
//   };


//   const showSubmenuEditModal = () => {
//     setSubMenuModal(true);
//   };

//   const handleSubmenuCancel = () => {
//     setSubMenuModal(false);
//   };

//   const editSbbb = (menuId: number, subId: number) => {
//   const menu = draftMenus.find(m => m.id === menuId);
//   const child = menu?.children.find(c => c.id === subId);

//   if (child) {
//     setEditItem({
//       menuId,
//       id: child.id,
//       name: child.name,
//       type: child.type, // "Text", "Image", "Document"
//     });
//     setEditModeType("submenu");
//     setIsEditModalOpen(true);
//   }
// };

//   return (


//     <div className="bg-white rounded-2xl mt-7 shadow p-8">


//       <h2 className="text-lg">Menu Management</h2>
//       <hr className="mt-3 mb-5" />

//       {/* Menu Type & Input Section */}
//       <div>
//       <AddMenu draftMenus={draftMenus} setDraftMenus={setDraftMenus} />
//       {/* <DraftMenuList draftMenus={draftMenus} /> */}
//     </div>



//       {/* Draft Menus */}
//       {draftMenus.length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold mb-5">📝 Draft Menus</h3>
//           <List
//             bordered
//             dataSource={draftMenus}
//             renderItem={(menu, idx) => (
//               <div key={menu.id} className="p-4 border rounded-md mb-6 shadow-sm">
//                 {/* Top Level Menu Info */}
//                 <div className="flex justify-between items-center">
//                   <List.Item className="!border-none !p-0">
//                     <span className="font-medium">
//                       {idx + 1}. {menu.name} (Key: {menu.key})
//                     </span>
//                   </List.Item>

//                   <div className="flex gap-2">
//                     <Button onClick={() => showDraftEditModal(menu)} className="!bg-green-700 !text-white hover:scale-105 transition">Edit</Button>
//                     <Button onClick={() => deleteDraftMenu(menu.id)} className="!bg-red-500 !text-white hover:scale-105 transition">Delete</Button>
//                   </div>
//                 </div>

//                 {/* Submenu (Children) */}
//                 {menu.children && menu.children.length > 0 && (
//                   <List
//                     size="small"
//                     bordered
//                     className="my-4"
//                     dataSource={menu.children}
//                     renderItem={(child, cidx) => (
//                       <List.Item
//                         actions={[
//                           <div className="flex gap-2 justify-end">
//                             <EditOutlined
//   className="text-green-700 cursor-pointer hover:scale-110 transition"
//   onClick={() => editSbbb(menu.id, child.id)}
// />
//       <EditSubMenuModal
//         visible={isEditModalOpen}
//         editItem={editItem}
//         setEditItem={setEditItem}
//         onOk={() => {
//           const updatedMenus = draftMenus.map(menu => {
//             if (menu.id === editItem.menuId) {
//               return {
//                 ...menu,
//                 children: menu.children.map(child =>
//                   child.id === editItem.id ? { ...child, name: editItem.name } : child
//                 ),
//               };
//             }
//             return menu;
//           });
//           setDraftMenus(updatedMenus);
//           setIsEditModalOpen(false);
//         }}
//         onCancel={() => setIsEditModalOpen(false)}
//       />
//                             <DeleteOutlined
//                               className="text-red-500 cursor-pointer hover:scale-110 transition"
//                               onClick={() => deleteSubbb(menu.id, child.id)}
//                             />
//                           </div>
//                         ]}
//                       >
//                         {cidx + 1}.{" "}
//                         {child.type === "Text" ? (
//                           <span>{child.name}</span>
//                         ) : child.type === "Image" ? (
//                           <img
//                             src={child.name}
//                             alt="draft-img"
//                             className="max-w-[100px] max-h-[60px] rounded"
//                           />
//                         ) : (
//                           <a
//                             href={child.name}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-600 underline"
//                           >
//                             View Document
//                           </a>
//                         )}
//                       </List.Item>
//                     )}
//                   />
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-4 mt-5 flex-col md:flex-row">
//                   <Button
//                     className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
//                     onClick={() => showContentModal(menu.id)}
//                   >
//                     Add Content
//                   </Button>
//                   <Button
//                     className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
//                     onClick={() => showSubMenuModal(menu.id)}
//                   >
//                     Add Sub Menu
//                   </Button>
//                   <Button
//                     className="bg-green-700 text-white w-full md:w-auto hover:!bg-green-500"
//                     onClick={saveDraftToMenus}
//                   >
//                     Save Menu
//                   </Button>
//                 </div>
//               </div>
//             )}
//           />

//           {/* Modal for Content Add */}
//           <AddContentModal
//             open={isContentModalOpen}
//             contentType={contentType}
//             contentValue={contentValue}
//             setContentType={setContentType}
//             setContentValue={setContentValue}
//             onOk={handleAddContent}
//             onCancel={() => setIsContentModalOpen(false)}
// />

//         </div>
//       )}
//       {/* Saved Menus Section */}
//       <div className="mt-5">
//         <h3 className="p-4 text-2xl font-bold underline">Saved Menu Structure</h3>
//         {menus.map((menu, index) => (
//           <Card
//             key={menu.id}
//             title={
//               <>
//                 <div className="flex justify-between">
//                   {index + 1}. {menu.name} (Key: {menu.key})

//                   <div className="flex gap-3">
//                     <Button onClick={showEditModal} className="!bg-green-700 !text-white active:scale-110">Edit</Button>
//                     <Button onClick={() => deleteMenu(menu.id)} className="!bg-red-500 !text-white active:scale-110">Delete</Button>

//                   </div>
//                 </div>
//                 <EditMenuModal 
//                 isOpenSubMenuEditModal = {isOpenSubMenuEditModal}
//                 handleCancel = {handleCancel}
//                 menu = {menu}
//                 />
                
//               </>
//             }
//             style={{ marginBottom: 16 }}
//           >
//             <List
//               bordered
//               dataSource={menu.children}
//               renderItem={(item, idx) => (
//                 <List.Item
//                   actions={[
//                     <EditOutlined
//                       onClick={showSubmenuEditModal}

//                     />,
//                    <EditSaveSubMenu
//                     subMenuModal = {subMenuModal}
//                     handleSubmenuCancel = {handleSubmenuCancel}
//                     menu = {menu}
//                    />,

//                     <DeleteOutlined
//                       key="delete"
//                       onClick={() => deleteSubMenu(menu.id, item.id)}
//                     />,
//                   ]}
//                 >
//                   {idx + 1}. {item.name} (Key: {item.key})
//                 </List.Item>
//               )}
//             />

//           </Card>
//         ))}

//         <div
//           style={{
//             background: "#fff7e6",
//             padding: 16,
//             marginTop: 16,
//             border: "1px solid #ffe58f",
//           }}
//         >
//           The <b>"WhatsApp Interactive Chat Menu"</b> can be started replying
//           specific keywords like: <b>Hello, Hi, M, #, Menu</b>. Without these
//           keywords, the menu cannot be started.
//         </div>
//       </div>

//       {/* Menu Key Modal */}
//       <MenuKeyModal
//       isMenuModalOpen = {isMenuModalOpen}
//       handleConfirmAddMenu ={handleConfirmAddMenu}
//       setIsMenuModalOpen = {setIsMenuModalOpen}
//       setMenuKey = {setMenuKey}
//       menuKey = {menuKey}
//        />

//       {/* SubMenu Modal */}
      
//       <AddSubMenuModal
//       isSubMenuModalOpen = {isSubMenuModalOpen}
//       handleAddSubMenu = {handleAddSubMenu}
//       setIsSubMenuModalOpen ={setIsSubMenuModalOpen}
//       setSubMenuName = {setSubMenuName}
//       setSubMenuKey = {setSubMenuKey}
//       subMenuName = {subMenuName}
//       subMenuKey = {subMenuKey}
//       />
//  <EditDraftMenuModal
//         visible={isDraftEditModalOpen}
//         editDraftMenu={editDraftMenu}
//         setEditDraftMenu={setEditDraftMenu}
//         onOk={handleUpdateDraftMenu}
//         onCancel={() => setIsDraftEditModalOpen(false)}
//       />

//     </div>
//   );

// };

// export default Chatbots;