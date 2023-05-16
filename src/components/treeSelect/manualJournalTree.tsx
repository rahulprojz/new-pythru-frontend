import * as React from "react";

// import "./styles.css";
//@ts-ignore
import TreeSelect from "rc-tree-select";
import "rc-tree-select/assets/index.css";
import "./treeSelect.scss";

const arrowPath =
  "M765.7 486.8L314.9 134.7c-5.3-4.1" +
  "-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l36" +
  "0 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6" +
  ".7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-3" +
  "7.6 0-50.4z";

const getSvg = (path: any, iStyle: any = {}, style: any = {}) => {
  return (
    <i style={iStyle}>
      <svg
        viewBox="0 0 1024 1024"
        width="1em"
        height="1em"
        fill="currentColor"
        style={{ verticalAlign: "-.125em", ...style }}
      >
        <path d={path} />
      </svg>
    </i>
  );
};

const switcherIcon = (obj: any) => {
  if (obj.isLeaf) {
    return getSvg(
      arrowPath,
      { cursor: "pointer", backgroundColor: "white" },
      { transform: "rotate(270deg)" }
    );
  }
  return getSvg(
    arrowPath,
    { cursor: "pointer", backgroundColor: "white" },
    { transform: `rotate(${obj.expanded ? 90 : 0}deg)` }
  );
};

const iconProps = {
  switcherIcon,
};

const iconPropsFunction = {
  switcherIcon,
};

function App({
  data,
  value,
  handleChangeTreeSelect,
  name,
  label,
  index = 0,
  onBlur,
  getAllData = false,
  onSelect,
}: any) {
  const [options, setOptions] = React.useState([]);
  const onChangeChildren = (...args: any) => {
    const value = args[0];
    const pre = value ? value : undefined;
    const isChild = args[2].triggerNode?.props.isChild;
    handleChangeTreeSelect(isLeaf(value) ? value : pre, isChild);
  };
  function isLeaf(value: any) {
    if (!value) {
      return false;
    }
    let queues = [...options];
    while (queues.length) {
      // BFS
      const item: any = queues.shift();
      if (item.value === value) {
        if (!item.children) {
          return true;
        }
        return false;
      }
      if (item.children) {
        queues = queues.concat(item.children);
      }
    }
    return false;
  }
  React.useEffect(() => {
    const parseDataForOption: any =
      data?.length &&
      data.map((item: any) => {
        if (item?.userAccounts?.length) {
          return {
            parentCategoryName: item.categoryName,
            title: item.categoryName,
            value: item._id,
            chartOfAccountType: item.chartOfAccountType,
            isChild: false,
            disabled: true,
            children: item?.userAccounts.map((data: any) => {
              return {
                parentCategoryName: item.categoryName,
                title: data.name, //item.categoryName + "-" +
                categoryName: data.name,
                value: data._id,
                chartOfAccountType: item.chartOfAccountType,
                isChild: true,
                customerVendorId: data?.customerVendorId,
              };
            }),
          };
        } else {
          return {
            parentCategoryName: item.categoryName,
            title: item.categoryName,
            value: item._id,
            chartOfAccountType: item.chartOfAccountType,
            isChild: false,
          };
        }
      });
    setOptions(parseDataForOption);
  }, []);
  const filterTreeNode = (input: any, child: any) => {
    //
    return (
      String(child.props.title?.toLowerCase()).indexOf(input?.toLowerCase()) ===
      0
    );
  };

  return (
    <React.Fragment>
      <div className="custom-treeSelect">
        <label className="lb">
          {label}
          <span style={{ color: "red" }}>*</span>
        </label>

        <TreeSelect
          onSelect={onSelect}
          placeholder={<span>Please select a category</span>}
          style={{ width: "100%" }}
          dropdownStyle={{
            maxHeight: 200,
            overflow: "auto",
            zIndex: 1500,
          }}
          name={name}
          // {...iconProps}
          // switcherIcon
          transitionName="rc-tree-select-dropdown-slide-up"
          choiceTransitionName="rc-tree-select-selection__choice-zoom"
          searchPlaceholder="Please search here..."
          showSearch
          allowClear
          treeLine
          value={value}
          // treeNodeFilterProp="label"
          treeData={options}
          treeNodeFilterProp="title"
          filterTreeNode={filterTreeNode}
          onChange={onChangeChildren}
          onBlur={onBlur}
          //multiple={true}
          //labelInValue
        />
      </div>
    </React.Fragment>
  );
}
export default App;
