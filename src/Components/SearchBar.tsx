import * as React from "react";
import { Icon, IconButton, Searchbar } from "react-native-paper";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Searchbar
      placeholder="Tìm kiếm"
      onChangeText={setSearchQuery}
      value={searchQuery}
      // traileringIcon="avatar"
      // onTraileringIconPress={() => {
      //   console.log("Pressed");
      // }}
      right={() => {
        return (
          <IconButton
            icon="account-circle"
            style={{marginRight: 8}}
            onPress={() => console.log("Pressed")}
          />
        );
      }}
    />
  );
};

export default SearchBar;
