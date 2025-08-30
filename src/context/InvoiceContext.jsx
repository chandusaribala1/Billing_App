// src/context/InvoiceContext.jsx
import React, { createContext, useState } from "react";

export const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [refreshInvoices, setRefreshInvoices] = useState(false);

  return (
    <InvoiceContext.Provider value={{ refreshInvoices, setRefreshInvoices }}>
      {children}
    </InvoiceContext.Provider>
  );
};
