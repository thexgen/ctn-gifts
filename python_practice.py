#reverse a string without built in func reverse.
# sen = 'my name is krishna'
# print(sen[::-1])


# find duplicate element
# arr = [12,34,56,32,13,44,12,32]
# unique = [arr[0]]
# duplicate = []
# for i in range(1,len(arr)):
#     if arr[i] in unique:
#         duplicate.append(arr[i])  
#     else:
#         unique.append(arr[i])

# print(f'unique ele : {unique}')
# print(f'duplicate ele : {duplicate}')


# count of frequency of a word in a string 
# sen = 'my name is krisna and krishna is also the name of loard krishna'
# word = 'krishna'
# splited = sen.split()
# count = 0
# for e in splited:
#     if e == word:
#         count+=1

# print(f'the word {word} comes {count} times.')


# find the largest number
# arr = [1,2,5,12,5,7,8]
# large = arr[0]
# for i in range(1,len(arr)):
#     if arr[i] > large:
#         large = arr[i]

# print(f'largest ele in an array is : {large}')

# find second largest number in an array 
# arr = [1,2,5,12,5,7,8]
# flarge = arr[0]
# slarge = arr[0]
# for i in range(1,len(arr)):
#     if arr[i] < flarge and arr[i] > slarge:
#         slarge = arr[i]
#     if arr[i] > flarge:
#         flarge = arr[i]

# print(f'second large ele : {slarge}')


# find the missing number in an array
arr = [1,3,5,7,9,11,13,17,21,23,27]
diff = arr[1]-arr[0]
missing = []
for i in range(1,len(arr)):
    if (arr[i] - arr[i-1]) != diff:
        missing.append(arr[i-1]+diff)

print(f'mising ele are : {missing}')