export const SearchForm = {
  keyword: '',
  category: 'All Catogories',
  conditions: [{
    name: 'New' , selected : false,
   },
   {
    name: 'Used'  , selected : false,
   },
   {
    name: 'Unspecified'  , selected : false,
   }
 ],
  shippings: [{
    name: 'Local Pickup' , selected : false,
   },
   {
    name: 'Free Shipping'  , selected : false,
   }
  ],
  distance: 10,
  zip: '',
  useCurLoc: true,
  location: ''
}
