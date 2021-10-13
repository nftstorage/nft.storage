ALTER TABLE resource ADD
FOREIGN KEY (content_cid) REFERENCES content(cid);
