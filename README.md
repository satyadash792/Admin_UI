--------Hooks------
Not  used libarly like material UI or bootstrap to implement any functionality all are implemented using general js concept.

Technical functionality:-
1. Search bar
  i) As you search something in searchbar it will populate the result according to result. But i have given  postperpage=10 so you will only able to see 10 rows of data in tabele. so you will get less than or equals to 10 data as per order.

2. Table section
  i)Delete button-In action section a delete button is there if you click that it will remove that row from  local memory.
  ii)Edit button- If you cleck on edit the row converted into input box you can edit that and two new button are under action column sava and cancel.
  iii)save button-If you click on save that new edited thing is saved in local memory and hook are updated.
  iv)cancel button- If you click on cancel new edited changes will discard and you will able to see previous changes 
  v) Checkbox- If you click on top checkbox all others will selected automatically. also you can select one by one.

 3. pagination section
  i)Delete multiple- It will delete all checkbox that are selected and according to that it will update pagination buttons.
  ii)Next button-On click on next you will move to next page and on last page it will disabled as no further pages are there
  iii)Previous button- you will move to previous page and on first page it will disabled as no further pages are there
  iv)First page(double left arrow button)-you will move to first page
  v)Last page(double right arrow button)-you will move to Last page
  vi)Page Number button- Onclick you will move to that page

Technical Aspects-
1. Table.js
   --USESTATE---
   i) tableData - It stores all the data coming from api.Update data if you update or delete something.
   ii) searchTableData - It stores all the data after searching operation . so it helps filterTableData for filteration
   iii) filterTableData - It helps to display all data in UI according to pagination. it take help from searchTableData 
   iv) editRowId - It store which id tablerow to be edited. Cancel operation it send this id as null.
   v) editFormData - It store data as we update the row and update the table.
   vi) paginationDetails - It stores the details regarding page number and rows per page and update it according to it. This is a further extension different paging.

   --USEEFFECT
   i) getTableData- Used to fetch table data and store it in memory to perform operation.

 2. EditableRow.js     
   i)It is used for editing rows and save that in the table.

 3. ReadORow.js
   i)It is used for populating table row Data.

 4. Pagination.js
   --USESTATE- 
   i) pageNo- It is used to set page number and you can move to any page number as per your wish.
   ii)Pages updates automatically due to pagination .

--Icon link for icon---
icon link-https://react-icons.github.io/react-icons/