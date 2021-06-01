import Pagination from "@material-ui/lab/Pagination";
const PageSelector = (props) => {
  return (
    <Pagination
      count={props.pages.length}
      shape="rounded"
      page={props.page}
      size="large"
      onChange={(e, v) => {
        console.log(v);
        props.setCurrentPage(v);
      }}
    />
  );
};
export default PageSelector;
