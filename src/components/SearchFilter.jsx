/** @jsx jsx */
import { jsx } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState, useEffect, useRef, Children } from 'react';
import ReactTags from 'react-tag-autocomplete';
import { MIN_TOUCH_SIZE } from '../styles';
import { DebugData } from './DebugData';
import { SearchTag } from './Tag';

export function SearchFilter(props) {
  const { children } = props;
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const query = useStaticQuery(graphql`
    query {
      allGraphCmsTag {
        nodes {
          slug
          name: title
          id
          tagType
        }
      }
      allGraphCmsBook {
        nodes {
          slug
          name: title
          id
        }
      }
    }
  `);

  useEffect(() => {
    let combined = [];
    // combined = combined.concat(query.allGraphCmsBook.nodes);
    combined = combined.concat(
      query.allGraphCmsTag.nodes.map((tag) => ({
        name: `${tag.name} (${tag.tagType.replace('_', ' ')})`,
        id: tag.id,
      }))
    );
    setSuggestions(combined);
  }, []);

  const onDelete = (i) => {
    const t = tags.slice(0);
    t.splice(i, 1);
    tags.splice(tags);
    console.log('onDelete', t);

    setTags(t);
  };
  const onAddition = (tag) => {
    const t = tags.concat(tag);
    setTags(t);
  };

  // const tagsRef = useRef();

  return (
    <div
      css={{
        width: '100%',

        '.react-tags': {
          width: '100%',
        },

        '.react-tags__search-input': {
          width: '100%',
          minWidth: MIN_TOUCH_SIZE,
          minHeight: MIN_TOUCH_SIZE,
        },
      }}
    >
      <ReactTags
        // ref={tagsRef}
        style={{}}
        tags={tags}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition}
        tagComponent={SearchTag}
        classNames={{
          root: 'react-tags',
          rootFocused: 'is-focused',
          selected: 'react-tags__selected',
          selectedTag: 'react-tags__selected-tag',
          selectedTagName: 'react-tags__selected-tag-name',
          search: 'react-tags__search',
          searchWrapper: 'react-tags__search-wrapper',
          searchInput: 'react-tags__search-input',
          suggestions: 'react-tags__suggestions',
          suggestionActive: 'is-active',
          suggestionDisabled: 'is-disabled',
          suggestionPrefix: 'react-tags__suggestion-prefix',
        }}
      />
      {Children.map(children, (child) => {
        return <div>This is child </div>;
      })}
      <DebugData>{suggestions}</DebugData>
    </div>
  );
}

export default SearchFilter;
