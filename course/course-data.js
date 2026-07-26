/* ProgramWise — course structure data.
   This is the ONE place that defines every topic, its file, and its
   sub-sections. course.js reads this to build the sidebar on every page
   in /course, so nothing about the menu is ever hand-copied per page. */

const COURSE_SECTIONS = [
  {
    id: 'basics',
    title: 'Basics',
    file: 'basics.html',
    subs: [
      { id: 'basics-print', title: 'Print' },
      { id: 'basics-keywords', title: 'Keywords & Identifiers' },
      { id: 'basics-blocks', title: 'Blocks & Indentation' },
      { id: 'basics-operators', title: 'Operators' },
      { id: 'basics-comments', title: 'Comments' },
      { id: 'basics-input', title: 'Input' }
    ]
  },
  {
    id: 'data-types',
    title: 'Data Types',
    file: 'data-types.html',
    subs: [
      { id: 'dt-intro', title: 'Introduction' },
      { id: 'dt-mutable', title: 'Mutable' },
      { id: 'dt-immutable', title: 'Immutable' },
      { id: 'dt-casting', title: 'Type Casting' }
    ]
  },
  {
    id: 'conditional',
    title: 'Conditionals',
    file: 'conditional.html',
    subs: [
      { id: 'ie-if', title: 'If Statement' },
      { id: 'ie-else', title: 'Else Statement' },
      { id: 'ie-elif', title: 'Elif Statement' }
    ]
  },
  {
    id: 'looping',
    title: 'Loops',
    file: 'looping.html',
    subs: [
      { id: 'loop-for', title: 'For Loop & Range' },
      { id: 'loop-while', title: 'While Loop' },
      { id: 'loop-break-continue', title: 'Break & Continue' }
    ]
  },
  {
    id: 'strings',
    title: 'Strings',
    file: 'strings.html',
    subs: [
      { id: 'str-intro', title: 'Introduction' },
      { id: 'str-indexing', title: 'Indexing & Slicing' },
      { id: 'str-operators', title: 'Operators' },
      { id: 'str-methods', title: 'Methods' }
    ]
  },
  {
    id: 'lists',
    title: 'List',
    file: 'lists.html',
    subs: [
      { id: 'list-intro', title: 'Introduction' },
      { id: 'list-indexing', title: 'Indexing & Slicing' },
      { id: 'list-operators', title: 'Operators' },
      { id: 'list-methods', title: 'Methods' }
    ]
  },
  {
    id: 'tuples',
    title: 'Tuples',
    file: 'tuples.html',
    subs: [
      { id: 'tup-intro', title: 'Introduction' },
      { id: 'tup-indexing', title: 'Indexing & Slicing' },
      { id: 'tup-operators', title: 'Operators' },
      { id: 'tup-methods', title: 'Methods' }
    ]
  },
  {
    id: 'dictionaries',
    title: 'Dictionaries',
    file: 'dictionaries.html',
    subs: [
      { id: 'dict-intro', title: 'Introduction' },
      { id: 'dict-access', title: 'Accessing Elements' },
      { id: 'dict-methods', title: 'Methods' }
    ]
  },
  {
    id: 'functions',
    title: 'Functions',
    file: 'functions.html',
    subs: [
      { id: 'fn-basics', title: 'Basics' },
      { id: 'fn-return', title: 'Return' },
      { id: 'fn-arguments', title: 'Arguments' },
      { id: 'fn-scope', title: 'Scope' }
    ]
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    file: 'exception-handling.html',
    subs: [
      { id: 'exc-types', title: 'Types of Errors' },
      { id: 'exc-try', title: 'Try-Except & Finally' }
    ]
  },
  {
    id: 'file-handling',
    title: 'File Handling',
    file: 'file-handling.html',
    subs: [
      { id: 'fh-basics', title: 'Basics (Opening & Closing, File Modes)' },
      { id: 'fh-with', title: 'With Clause' },
      { id: 'fh-text', title: 'Text Files' },
      { id: 'fh-pointers', title: 'File Pointers' },
      { id: 'fh-binary', title: 'Binary Files & Pickle' },
      { id: 'fh-csv', title: 'CSV Files' }
    ]
  },
  {
    id: 'standard-python-modules',
    title: 'Standard Python Modules',
    file: 'standard-python-modules.html',
    subs: [
      { id: 'mod-math', title: 'Math Module' },
      { id: 'mod-random', title: 'Random Module' },
      { id: 'mod-statistics', title: 'Statistics Module' }
    ]
  }
];
