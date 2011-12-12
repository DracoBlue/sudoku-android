find_doubles = (values...) ->
  first_find = {}
  doubles = []
  for v, pos in values
    # console.log pos, v
    if first_find[v] == undefined
      first_find[v] = pos
      doubles.push ' '
    else
      doubles.push 'x'
      doubles[ first_find[v] ] = 'x'
  return doubles    
      
console.log find_doubles 1,2,3,4
console.log find_doubles 1,1,1,1
console.log find_doubles 1,1,3,4
console.log find_doubles 1,2,4,4
console.log find_doubles 1,4,4,4

size = 4
colors = ['r','g','b','y']

print = (game) ->
  for line in game
    s = "[' #{line[0]}', '#{line[1]}', '#{line[2]}', '#{line[3]}' ]"
    console.log s

game = (' ' for x in [1..size] for y in [1..size])

#print game

level=
  r: [[0,0],[1,2]]
  g: [[3,3]]
  b: [[1,1]]
  y: [[2,3]]

for c in colors
  #console.log c
  marks = level[c]
  #console.log marks
  for [x,y] in marks
    #console.log "#{x},#{y}"
    game[x][y] = c

print game