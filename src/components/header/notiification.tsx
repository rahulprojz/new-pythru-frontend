import { Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  getNavigationPath,
  navEnum,
  profileIcon,
  NOTIFICATION_TYPE,
  NOTIFICATION_PLACEHOLDER,
} from "../../constants";
import { addDefaultSrc } from "../../utils";

interface notificationProps {
  notificationList: any;
  endIndex?: number;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Notiification({
  notificationList,
  endIndex = notificationList.length,
  setState,
}: notificationProps) {
  const navigate = useNavigate();
  const handleRedirect = (item: any) => {
    if (
      ![
        navEnum.UPDATE_PASSWORD,
        navEnum.SIGN_UP_OTP,
        navEnum.FORGET_PASSWORD_OTP,
        navEnum.ADMIN,
      ].includes(item.type)
    ) {
      setState(false);
      var type = item.type;
      if (item.dynamicData?.type == NOTIFICATION_TYPE.ONE_DUE_DAY) {
        type = item.dynamicData.documentType;
      }
      navigate(getNavigationPath(type), {
        state: {
          id: item?.dynamicData?.documetId,
        },
      });
    }
  };
  return (
    <div className="noti_internal_list">
      <ul>
        {notificationList && notificationList.length ? (
          notificationList
            .slice([0], [endIndex])
            .map((item: any, index: number) => {
              return (
                <li
                  className={item.isSeen ? "read" : "unread"}
                  key={index}
                  onClick={() => handleRedirect(item)}
                >
                  <div className="noti_media">
                    <figure className="ur_img">
                      <img
                        onError={(e) => addDefaultSrc(e, profileIcon)}
                        src={item?.image || profileIcon}
                        alt="img"
                      />
                    </figure>
                    <div className="nt_ls_rt">
                      <Typography variant="body2" className="semi-bold">
                        {item?.dynamicData?.displayName}
                      </Typography>
                      <Typography variant="subtitle2" className="color-label">
                        {item?.message}
                      </Typography>
                      <div className="dt">
                        {moment(item.createdAt).fromNow()}{" "}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
        ) : (
          <div className="no-record">
            <img src={NOTIFICATION_PLACEHOLDER} alt="" />
          </div>
        )}
      </ul>
    </div>
  );
}
