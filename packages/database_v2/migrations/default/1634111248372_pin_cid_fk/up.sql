ALTER TABLE pin ADD
FOREIGN KEY (content_cid) REFERENCES content(cid);
