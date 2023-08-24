import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDesktop,
  faStaffAesculapius,
  faFileContract,
  faProjectDiagram,
  faCog,
  faUserGroup,
  faDollar,
  faJournalWhills,
  faMoneyBillTransfer,
  faLineChart,
  faWarehouse,
  faList12,
  faEuroSign,
  faUsersViewfinder
} from "@fortawesome/free-solid-svg-icons";
import {
  faAddressCard,
  faListAlt,
  faQuestionCircle
} from "@fortawesome/free-regular-svg-icons";
import { faGoodreads, faSalesforce } from "@fortawesome/free-brands-svg-icons";

/*
 * Aside Menu Configuration
 * the object below is representation of the side navigation menu configuration
 * there are some property you can use to customize your menu
 */

const ASIDE_MENU: ASIDE_MENU_INTERFACE = [
  {
    type: "link",
    name: "Admindashboard",
    title: "Dashboard",
    link: "/admin/",
    icon: <FontAwesomeIcon icon={faDesktop} />
  },
  {
    type: "link",
    name: "client",
    title: "Client",
    link: "/admin/clients",
    icon: <FontAwesomeIcon icon={faUser} />
  },
  {
    type: "group",
    name: "accounting",
    title: "Accounting",
    icon: <FontAwesomeIcon icon={faDollar} />,
    child: [
      {
        type: "link",
        name: "transaction",
        title: "Transaction",
        link: "/admin/accounting/transaction"
      },
      {
        type: "link",
        name: "journalEntry",
        title: "Journal Entry",
        link: "/admin/accounting/journalEntry",
        icon: <FontAwesomeIcon icon={faJournalWhills} />
      },
      {
        type: "link",
        name: "transfer",
        title: "Transfer",
        link: "/admin/accounting/transfer",
        icon: <FontAwesomeIcon icon={faMoneyBillTransfer} />
      },
      {
        type: "link",
        name: "chartAccount",
        title: "Chart of Accounts",
        link: "/admin/accounting/chart",
        icon: <FontAwesomeIcon icon={faLineChart} />
      }
    ]
  },
  {
    type: "group",
    name: "warehouse",
    title: "Warehouse",
    icon: <FontAwesomeIcon icon={faWarehouse} />,
    child: [
      {
        type: "link",
        name: "warehouseInventoryHistory",
        title: "Inventory History",
        link: "/admin/warehouse/inventory"
      },
      {
        type: "link",
        name: "warehouseGoodReceipt",
        title: "Good Receipt",
        link: "/admin/warehouse/good"
      }
    ]
  },
  {
    type: "link",
    name: "contract",
    title: "Contract",
    link: "/admin/contract",
    icon: <FontAwesomeIcon icon={faFileContract} />
  },
  {
    type: "link",
    name: "project",
    title: "Project",
    link: "/admin/project",
    icon: <FontAwesomeIcon icon={faProjectDiagram} />
  },
  {
    type: "group",
    name: "setting",
    title: "Setting",
    icon: <FontAwesomeIcon icon={faCog} />,
    child: [
      {
        type: "link",
        name: "staff",
        title: "Staff",
        link: "/admin/setting/staff",
        icon: <FontAwesomeIcon icon={faStaffAesculapius} />
      },
      {
        type: "group",
        name: "finance",
        title: "Finance",
        icon: <FontAwesomeIcon icon={faEuroSign} />,
        child: [
          {
            type: "link",
            name: "currency",
            title: "Currency",
            link: "/admin/setting/currency"
          },
          {
            type: "link",
            name: "taxes",
            title: "Taxes",
            link: "/admin/setting/tax"
          },
          {
            type: "link",
            name: "paymentmode",
            title: "Payment Mode",
            link: "/admin/setting/paymentmode"
          },
          {
            type: "link",
            name: "expensecategory",
            title: "Expense Category",
            link: "/admin/setting/expensecategory"
          }
        ]
      },
      {
        type: "group",
        name: "clients",
        title: "Clients",
        icon: <FontAwesomeIcon icon={faUser} />,
        child: [
          {
            type: "link",
            name: "clientgroup",
            title: "Client Group",
            link: "/admin/setting/clientgroup",
            icon: <FontAwesomeIcon icon={faUserGroup} />
          },
          {
            type: "link",
            name: "clientfield",
            title: "Client Field",
            link: "/admin/setting/clientfield",
            icon: <FontAwesomeIcon icon={faUsersViewfinder} />
          }
        ]
      },
      {
        type: "group",
        name: "support",
        title: "Support",
        icon: <FontAwesomeIcon icon={faGoodreads} />,
        child: [
          {
            type: "link",
            name: "department",
            title: "Department",
            link: "/admin/setting/department",
            icon: <FontAwesomeIcon icon={faAddressCard} />
          }
        ]
      },
      {
        type: "group",
        name: "contract",
        title: "Contract",
        icon: <FontAwesomeIcon icon={faFileContract} />,
        child: [
          {
            type: "link",
            name: "contractType",
            title: "Contract Type",
            link: "/admin/setting/contract",
            icon: <FontAwesomeIcon icon={faFileContract} />
          }
        ]
      },
      {
        type: "group",
        name: "item",
        title: "Item",
        icon: <FontAwesomeIcon icon={faListAlt} />,
        child: [
          {
            type: "link",
            name: "itemField",
            title: "Item Field",
            link: "/admin/setting/itemfield",
            icon: <FontAwesomeIcon icon={faList12} />
          }
        ]
      },
      {
        type: "link",
        name: "role",
        title: "Role",
        link: "/admin/setting/role",
        icon: <FontAwesomeIcon icon={faQuestionCircle} />
      }
    ]
  }
];

export type ASIDE_MENU_INTERFACE = Array<
  | ASIDE_MENU_LINK_INTERFACE
  | ASIDE_MENU_GROUP_INTERFACE
  | ASIDE_MENU_SECTION_INTERFACE
>;

export interface ASIDE_MENU_LINK_INTERFACE {
  type: "link";
  name: string;
  title: string;
  link: string;
  icon?: ReactNode;
  addon?: ReactNode;
}

export interface ASIDE_MENU_SECTION_INTERFACE {
  type: "section";
  name: string;
  title: string;
  child: Array<ASIDE_MENU_LINK_INTERFACE | ASIDE_MENU_GROUP_INTERFACE>;
}

export interface ASIDE_MENU_GROUP_INTERFACE {
  type: "group";
  name: string;
  title: string;
  icon?: ReactNode;
  child: Array<ASIDE_MENU_LINK_INTERFACE | ASIDE_MENU_GROUP_INTERFACE>;
}

export type ASIDE_MENU_ITEM_TYPES = "link" | "section" | "group";

export default ASIDE_MENU;
