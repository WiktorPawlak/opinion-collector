insert into client (uuid, created_at, email, is_enabled, password, role, username)
values ('00000000-0000-0000-0000-000000000000',
        '2022-11-13 11:58:20',
        'admin@admin.com',
        true,
        '$2a$12$AmP1WWgXV0OCuMIq2RAaAOob.y1ZKX1juQpsbYzeTGpHvuFEFxLkW',
        'ADMIN',
        'admin'),
       ('00000000-0000-0000-0000-000000000001',
        '2022-11-13 11:58:20',
        'user@user.com',
        true,
        '$2a$12$T.AIU1Abab3LXtso/QG4semql6GyqOQFKXBbXMLNkosq9AtFLej0O',
        'STANDARD',
        'user'),
       ('00000000-0000-0000-0000-000000000002',
        '2022-11-13 11:58:20',
        'user2@user2.com',
        true,
        '$2a$12$T.AIU1Abab3LXtso/QG4semql6GyqOQFKXBbXMLNkosq9AtFLej0O',
        'STANDARD',
        'user2');

insert into category (category_id, category_name, leaf, parent_category_id) values (1, 'string', true, null);
insert into products (product_id, category_id, ean, image, origin, title, visibility) values (1, 1, 'string', 1010,'USA', 'string', true);
