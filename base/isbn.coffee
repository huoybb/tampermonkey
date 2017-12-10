mod10 = (n)->
	n = n.replace(/-/,'')
	chars = n.split('')
	# console.log chars
	total = 0
	for value,key in chars
		total += parseInt(value) * (10-key)
	digit = (11 - total%11) % 11
	if digit is 10 then 'X' else digit
mod13 = (n)->
	n = n.replace(/-/,'')
	chars = n.split('')
	even = []
	odd = []
	(if parseInt(key) % 2 is 1 then even else odd).push parseInt(value) for value,key in chars
	total = even.reduce((x,y)->x+y)*3 + odd.reduce((x,y)->x+y)
	((Math.floor(total/10)+1)*10-total)%10


isbn13to10 = (num)->
	if not num? then return 
	num = num.replace(/-/,'')
	num9 = num.substr(3,9)
	num9+mod10(num9)
isbn10to13 = (num)->
	if not num? then return 
	num = num.replace(/-/,'')
	num9 = num.substr(0,9)
	'978'+num9+mod13('978'+num9)

export { isbn10to13, isbn13to10 }