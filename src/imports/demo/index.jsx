import React from "react";

import Button from "/imports/widgets/button_v2";
import Icon from "/imports/widgets/icon";
import TabPanel from "/imports/widgets/tab-panel";
import Input from "/imports/widgets/input";
import SelectBox from "/imports/widgets/selectbox";

import styles from "./styles";

export default () => (
    <div className={styles.section}>
        <TabPanel headerPosition="top">
            <TabPanel.TabItem itemKey="tab01"
                headerText="Tab 01"
                itemIcon="settings"
                isActive={true}>
                <div className={styles.container}>
                    <h3>Login Form</h3>
                    <Input type="text" label="User name:" labelPosition="top"
                        leftIcon="user" onChange={console.log} />
                    <Input type="password" label="Password:" labelPosition="top"
                        leftIcon="settings" onChange={console.log} />
                    <Button label="Login" rightIcon="chevron-right" onClick={() => console.log("@click on me")} />
                </div>
            </TabPanel.TabItem>
            <TabPanel.TabItem itemKey="tab02"
                headerText="Tab 02"
                itemIcon="about"
                isActive={true}>
                <div className={styles.container}>
                    <h3>Tab content 02</h3>
                    <SelectBox key="3"
                        options={[
                            {id: 1, name: "red"},
                            {id: 2, name: "green"},
                            {id: 3, name: "blue"}
                        ]}
                        multiple={true}
                        getValue={(data) => data.id}
                        onChange={console.log}
                        labelRenderer={(data) => data.name} />
                </div>
            </TabPanel.TabItem>
            <TabPanel.TabItem itemKey="tab03"
                headerText="Tab 03"
                itemIcon="account"
                isActive={true}>
                <div className={styles.container}>
                    <h3>Tab content 03</h3>
                    <SelectBox key="4"
                        options={[1, 2, 3, 4, 5, 6]}
                        getValue={(data) => data}
                        onChange={console.log}
                        labelRenderer={(data) => `opt ${data}`} />
                </div>
            </TabPanel.TabItem>
        </TabPanel>
    </div>
)
