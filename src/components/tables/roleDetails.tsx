import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel, Grid, Typography } from "@mui/material";
import NormalButton from "../buttons/normalButton";

interface Props {
  openDrawer: any;
  setEditOpen?: any;
  type: string;
}

const RoleDetails = (props: Props) => {
  const { roleList, memberDetail, roleDetail } = useSelector(
    (state: any) => state.teamManagementSlice
  );

  const state = props.type === "member" ? memberDetail : roleDetail;

  const roleName =
    (roleList?.length &&
      roleList?.find((role: any) => role._id === memberDetail.roleId)?.name) ||
    "N/A";

  const handleEdit = () => {
    props.openDrawer(false);
    props.setEditOpen(true);
  };

  return (
    <div>
      <h3 className="hd">Overview</h3>
      <NormalButton
        buttonText="Edit"
        className="btn-purple detailsEdit"
        onPress={handleEdit}
      />
      {props.type === "member" && (
        <Grid
          container
          rowSpacing={3}
          columnSpacing={2}
          className="details_wrapper"
        >
          <Grid item xs={12} sm={6}>
            <label>Name</label>
            <Typography variant="body2" gutterBottom>
              {memberDetail?.fullName || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label>Email</label>
            <Typography variant="body2" gutterBottom>
              {memberDetail?.email || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label>Mobile Number</label>
            <Typography variant="body2" gutterBottom>
              {memberDetail?.phoneNumber || "N/A"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <label>Role</label>
            <Typography variant="body2" gutterBottom>
              {roleName || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      )}

      {props.type === "role" && (
        <Grid
          container
          rowSpacing={3}
          columnSpacing={2}
          className="details_wrapper"
        >
          <Grid item xs={12} sm={12}>
            <label>Name</label>
            <Typography variant="body2" gutterBottom>
              {roleDetail?.name || "N/A"}
            </Typography>
          </Grid>
        </Grid>
      )}

      <Typography
        variant="subtitle1"
        className="color-purple bold m-t-30 m-b-20"
      >
        Permissions
      </Typography>
      <ul className="permission-list">
        {Object.keys(state).length > 0
          ? Object.entries(state?.permission)?.map(
              ([key, value]: any, i: number) => {
                return (
                  <li key={key}>
                    <Grid   container
                      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                      columnSpacing={{ xs: 0.5, sm: 1.5 }}>
                      <Grid item lg={4}>
                        <Typography variant="subtitle2" className="bold m-t-10 capitalize">
                          {key === "productAndServices"
                            ? key?.replace("productAnd", "Products  & ")
                            : key}
                        </Typography>
                      </Grid>
                      {Object.entries(value).map(([name, label]: any) => {
                        return (
                          <Grid item xs={3} sm={2.2} md={2} key={name}>
                            <FormControlLabel
                              control={<Checkbox checked={label} />}
                              label={name === "block" ? "Delete" : name}
                              labelPlacement="end"
                              className="nowrap capitalize"
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </li>
                );
              }
            )
          : null}
      </ul>
    </div>
  );
};

export default RoleDetails;
