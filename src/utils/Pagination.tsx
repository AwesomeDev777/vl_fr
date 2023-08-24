import { Pagination } from "@blueupcode/components";
import React from "react";

const PaginationStatesExample = (props: any) => {
  const [activeLinkNumber, setActiveLinkNumber] = React.useState(
    props.pagination.activeLinkNumber
  );
  const paginationLength = props.pagination.paginationLength;
  var paginationLinkNumbers = [];
  if (activeLinkNumber > paginationLength) {
    setActiveLinkNumber(paginationLength);
  }
  if (activeLinkNumber < 1) {
    setActiveLinkNumber(1);
  }
  if (paginationLength <= 7) {
    paginationLinkNumbers = Array.from(
      { length: paginationLength },
      (_, i) => i + 1
    );
  } else {
    if (activeLinkNumber <= 4) {
      paginationLinkNumbers = Array.from({ length: 7 }, (_, i) => i + 1);
    } else {
      if (paginationLength - activeLinkNumber > 3) {
        paginationLinkNumbers = Array.from(
          { length: 7 },
          (_, i) => activeLinkNumber + i - 3
        );
      } else {
        paginationLinkNumbers = Array.from(
          { length: 7 },
          (_, i) => paginationLength + i - 6
        );
      }
    }
  }
  React.useEffect(() => {
    props.pagination.chooseActiveLinkNumber(activeLinkNumber);
  }, [activeLinkNumber]);

  React.useEffect(() => {
    setActiveLinkNumber(props.pagination.activeLinkNumber);
  }, [props.pagination.activeLinkNumber]);
  return (
    <Pagination {...props}>
      <Pagination.Item
        onClick={() => setActiveLinkNumber(activeLinkNumber - 1)}
      >
        PREV
      </Pagination.Item>
      {paginationLinkNumbers.map((paginationNumber) => (
        <Pagination.Item
          key={paginationNumber}
          active={paginationNumber === activeLinkNumber}
          onClick={() => {
            setActiveLinkNumber(paginationNumber);
          }}
        >
          {paginationNumber}
        </Pagination.Item>
      ))}
      <Pagination.Item
        onClick={() => setActiveLinkNumber(activeLinkNumber + 1)}
      >
        Next
      </Pagination.Item>
    </Pagination>
  );
};

export default PaginationStatesExample;
