import sqlite3
import json
import sys
path = ''
output = []
if(len(sys.argv)) < 2:
	sys.exit('Please include the path to the db and try again')
else:
	path = sys.argv[1]
conn = sqlite3.connect(path)
cur = conn.cursor()
try:
	cur.execute('SELECT DISTINCT artwork.id, title, creator.description, creator.role, department.name, accession_number FROM artwork\
		LEFT OUTER JOIN artwork__department ON artwork.id = artwork__department.artwork_id\
		LEFT OUTER JOIN department ON department_id = department.id\
		LEFT OUTER JOIN artwork__creator ON artwork.id = artwork__creator.artwork_id\
		LEFT OUTER JOIN creator ON artwork__creator.creator_id = creator.id');
except Exception as e:
	print(e)
rows = cur.fetchall()
for row in rows:
	hasRecord = False
	i = 0
	while i < len(output):
		if 'artwork_id' in output[i] and row[0] == output[i]['artwork_id']:
			output[i]['creator'].append({'creator_description':row[2], 'creator_role':row[3]})
			hasRecord = True
			break
		i += 1
	if not hasRecord:
		output.append({
				'artwork_id':row[0],
				'title':row[1],
				'creator':[{
					'creator_description':row[2],
					'creator_role':row[3]
				}],
				'department_name':row[4],
				'accession_number':row[5]
			})
with open('output.txt', 'w') as result:
	json.dump(output, result, indent=4)

print('Number of artworks written to file: {0}'.format(len(output)))

conn.close()