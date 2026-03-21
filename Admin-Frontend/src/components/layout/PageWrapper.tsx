import React from 'react';
import type { PageWrapperProps } from '../../types';

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  pageTitle,
  action,
}) => {
  return (
    <div className="ml-44 mt-16 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {pageTitle && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{pageTitle}</h1>
          {action && <div>{action}</div>}
        </div>
      )}

      {/* Content */}
      {children}
    </div>
  );
};

export default PageWrapper;
