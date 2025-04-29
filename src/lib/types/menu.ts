import { Dispatch, SetStateAction } from "react";


export interface SubMenu {
  id: number;
  name: string;
  key: number;
  type: string;
}

export interface Menu {
  id: number;
  name: string;
  type: string;
  key: number;
  children: SubMenu[];
  subMenus?: Menu[];
}

export interface EditItem {
  id: number;
  name: string;
  menuId: number;
}

export interface Props {
  draftMenus: Menu[];
  setDraftMenus: Dispatch<SetStateAction<Menu[]>>;
  showDraftEditModal: (menu: Menu) => void;
  deleteDraftMenu: (id: number) => void;
  showSubMenuModal: (id: number) => void;
  showContentModal: (id: number) => void;
  saveDraftToMenus: () => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  editItem: EditItem;
  setEditItem: Dispatch<SetStateAction<EditItem>>;
  editModeType: "submenu" | "menu";
  setEditModeType: Dispatch<SetStateAction<"submenu" | "menu">>;
}


// export interface SubMenu {
//   id: number;
//   name: string;
//   key: number;
//   type: string;
//   children?: SubMenu[]; 
// }

// export interface Menu {
//   id: number;
//   name: string;
//   type: string;
//   key: number;
//   children: SubMenu[];
// }

// export interface EditItem {
//   id: number;
//   name: string;
//   menuId: number;
// }

// export interface Props {
//   draftMenus: Menu[];
//   setDraftMenus: Dispatch<SetStateAction<Menu[]>>;
//   showDraftEditModal: (menu: Menu) => void;
//   deleteDraftMenu: (id: number) => void;
//   showSubMenuModal: (id: number) => void;
//   showContentModal: (id: number) => void;
//   saveDraftToMenus: () => void;
//   isEditModalOpen: boolean;
//   setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
//   editItem: EditItem;
//   setEditItem: Dispatch<SetStateAction<EditItem>>;
//   editModeType: "submenu" | "menu";
//   setEditModeType: Dispatch<SetStateAction<"submenu" | "menu">>;
// }
