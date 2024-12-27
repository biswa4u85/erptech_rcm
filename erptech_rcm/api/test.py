import pymssql

consumptionSettings = {
    "db_host":"(local)",
    "db_user":"sa",
    "db_password":"@Admin",
    "database":"MCI360_DB_1121",
}
print(consumptionSettings)
connection = pymssql.connect(server, user, password, "tempdb")
connection = pymssql.connect(f"server={consumptionSettings.db_host};user={consumptionSettings.db_user};password={consumptionSettings.db_password};database={consumptionSettings.database}")
cursor = conn.cursor()
cursor.execute("""
IF OBJECT_ID('persons', 'U') IS NOT NULL
    DROP TABLE persons
CREATE TABLE persons (
    id INT NOT NULL,
    name VARCHAR(100),
    salesrep VARCHAR(100),
    PRIMARY KEY(id)
)
""")
cursor.executemany(
    "INSERT INTO persons VALUES (%d, %s, %s)",
    [(1, 'John Smith', 'John Doe'),
     (2, 'Jane Doe', 'Joe Dog'),
     (3, 'Mike T.', 'Sarah H.')])
# you must call commit() to persist your data if you don't set autocommit to True
conn.commit()

cursor.execute('SELECT * FROM persons WHERE salesrep=%s', 'John Doe')
row = cursor.fetchone()
while row:
    print("ID=%d, Name=%s" % (row[0], row[1]))
    row = cursor.fetchone()

conn.close()