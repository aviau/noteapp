import {
  Divider,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from '@mui/material';
import React from 'react';

export interface FormItemProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function FormItem({ title, description, children }: FormItemProps) {
  return (
    <Grid container>
      <Grid item xs={12} sm>
        <Typography variant="h6">{title}</Typography>
        {description && (
          <Typography variant="body2" color="GrayText">
            {description}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={3}>
        {children}
      </Grid>
    </Grid>
  );
}

interface Props {
  header?: string;
  items: FormItemProps[];
}

/** Returns a list of items with a title, description, and custom input component  */
export function FormList({ header, items }: Props) {
  return (
    <List subheader={<ListSubheader>{header}</ListSubheader>}>
      {items.map((item) => (
        <React.Fragment key={item.title}>
          <ListItem>
            <FormItem {...item} />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
