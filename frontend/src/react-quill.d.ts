declare module 'react-quill' {
  import * as React from 'react';

  interface ReactQuillProps {
    value: string;
    onChange: (content: string) => void;
    theme?: string;
    className?: string;
    modules?: any;
    formats?: string[];
    readOnly?: boolean;
    placeholder?: string;
  }

  const ReactQuill: React.ComponentType<ReactQuillProps>;
  export default ReactQuill;
} 