import { useState } from "react";
import styled from "styled-components";

import {
  AutoCompleteContainer,
  Input,
  AutoCompleteItem,
  AutoCompleteItemButton
} from "./styles";

const Root = styled.div`
  position: relative;
  width: 200px;
`;

export const AutoComplete = ({ iconColor, style, data, placeholder }) => {
  const [search, setSearch] = useState({
    text: "",
    suggestions: []
  });
  const [isComponentVisible, setIsComponentVisible] = useState(true);

  const onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, "i");
      suggestions = data.sort().filter((v) => regex.test(v.name));
    } else{
      suggestions = data;
    }

    setIsComponentVisible(true);
    setSearch({ suggestions, text: value });
  };

  const onTextClicked = (e) => {
    const value = e.target.value;
    if(value.length === 0){
      let suggestions = [];
      suggestions = data;
      setSearch({ suggestions, text: "" });
      setIsComponentVisible(true);
    }
  };

  const suggestionSelected = (value) => {
    setIsComponentVisible(false);

    setSearch({
      text: value.name,
      suggestions: []
    });
  };

  const { suggestions } = search;

  return (
    <Root style={style}>
      <div
        onClick={() => setIsComponentVisible(false)}
        style={{
          display: isComponentVisible ? "block" : "none",
          width: "200vw",
          height: "200vh",
          backgroundColor: "transparent",
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0
        }}
      />
      <div>
        <Input
          id="input"
          autoComplete="off"
          value={search.text}
          onChange={onTextChanged}
          onClick={onTextClicked}
          placeholder={placeholder || 'Search...'}
          type={"text"}
        />
      </div>
      {suggestions.length > 0 && isComponentVisible && (
        <AutoCompleteContainer>
          {suggestions.map((item) => (
            <AutoCompleteItem key={item.code}>
              <AutoCompleteItemButton
                key={item.code}
                onClick={() => suggestionSelected(item)}
              >
                {item.name}
              </AutoCompleteItemButton>
            </AutoCompleteItem>
          ))}
        </AutoCompleteContainer>
      )}
    </Root>
  );
};
