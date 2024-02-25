import { Helmet } from 'react-helmet-async';

import { TransactionsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> | Transactions | </title>
      </Helmet>

      <TransactionsView />
    </>
  );
}
