CREATE TABLE customer (
  id        SERIAL      NOT NULL,
  email     VARCHAR(255) NOT NULL,
  firstName VARCHAR(255),
  lastName  VARCHAR(255),
  company   VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE xebian (
  id        SERIAL      NOT NULL,
  email     VARCHAR(255) NOT NULL,
  firstName VARCHAR(255),
  lastName  VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE impact (
  id          SERIAL NOT NULL,
  description TEXT    NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  xebian_id    SERIAL NOT NULL  REFERENCES xebian (id),
  customer_id  SERIAL NOT NULL REFERENCES customer (id),
  PRIMARY KEY (id)
);

CREATE TABLE feedback (
  id          SERIAL NOT NULL,
  comment     TEXT    NULL,
  badges JSONB NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  customer_id    INTEGER DEFAULT NULL REFERENCES customer (id),
  xebian_id    INTEGER DEFAULT NULL REFERENCES xebian (id),
  impact_id  INTEGER NOT NULL REFERENCES impact (id),
  PRIMARY KEY (id)
);
