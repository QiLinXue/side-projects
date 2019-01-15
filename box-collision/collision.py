while True:
    v_big = -1
    m_big = 1

    v_small = 0
    m_small = 1

    collisions = 0

    def collide():
        global v_big,m_big,v_small,m_small,collisions
        v_big, v_small = (2*m_small*v_small)/(m_small+m_big)-(v_big*(m_small-m_big))/(m_small+m_big), (2*m_big*v_big)/(m_small+m_big)-(v_small*(m_big-m_small))/(m_small+m_big)
        collisions += 1

    m_big = int(input("Mass of the second block: "))

    while not v_big > v_small:
        collide()

        if v_big > v_small and v_small >= 0:
            break
        else:
            v_small = -v_small
            collisions += 1
    
    print("There are %s collisions" % collisions)


