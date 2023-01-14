import { useMemo, useCallback } from 'react';
import {
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { deleteCategory } from '../../../../api/categoryApi';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

export const CategoriesList = ({ categories }) => {
  const findChildren = useCallback((category, categories) => {
    const children = categories.filter(
      (child) => child.parent && child.parent.categoryId === category.categoryId
    );
    if (children.length > 0) {
      children.forEach((child) => {
        child.children = findChildren(child, categories);
      });
    }
    return children;
  }, []);

  const restructuredCategoriesTree = useMemo(() => {
    const initialCategories = categories.filter(
      (category) => category.parent === null
    );

    initialCategories.forEach((initialCategory) => {
      initialCategory.children = findChildren(initialCategory, categories);
    });

    return initialCategories;
  }, [categories, findChildren]);


  function onEditClick(e) {
    e.stopPropagation();
  }

  async function onDeleteClick(categoryId) {
    await deleteCategory(categoryId);
    window.location.reload();
  }

  const renderAccordion = (category) => {
    return (
      <Accordion sx={{ marginY: 2 }} key={category.categoryId}>
        <AccordionSummary disableGutters={true} expandIcon={<ExpandMoreIcon />}>
          {category.categoryName}
          <Button
            sx={{ width: '20' }}
            variant="text"
            className="search-btn"
            onClick={onEditClick}
          >
            Edit
          </Button>
          {category.leaf === true && <Button
            sx={{ width: '20' }}
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={() => onDeleteClick(category.categoryId)}
            size="small"
          >
            Delete
          </Button>}

        </AccordionSummary>
        {category.leaf === false && <AccordionDetails>
          {category.children &&
            category.children.map((child) => renderAccordion(child))}
        </AccordionDetails>}
        
      </Accordion>
    );
  };

  return (
    <Box padding={4}>
      {restructuredCategoriesTree &&
        restructuredCategoriesTree.map((category) => renderAccordion(category))}
    </Box>
  );
};
