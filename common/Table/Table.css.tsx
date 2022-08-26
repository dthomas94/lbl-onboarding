import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  height: ${(props) => (props.tableHeight ? props.tableHeight : "100%")};
  background-color: ${(props) => (props.lightTheme ? "white" : "#4299e199")};

  th {
    border: 1px solid black;
  }

  tr:nth-child(even) {
    background-color: ${(props) => (props.lightTheme ? "#4299e199" : "white")};
  }

  td {
    padding: 5px 10px;
    min-width: 100px;
  }
`;
