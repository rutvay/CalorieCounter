int main()
{
    int t;
    void helper(vector<int>& nums,int i,vector<int> &subset,int L,int R,int X,int &ans)
    {
        if(i==nums.size())
        {
            if(subset.size()<=1)
                return;

            sort(subset.begin(),subset.end());
            if(subset[0] < L)
                return;
            if(subset[subset.size()-1] > R)
                return;
            if(subset[subset.size()-1] - subset[0] < X)
                return;
            
            ans++;
            return;
        }
            
        // lets first not include the element in the subset
        helper(nums,i+1,subset,res);
        // lets consider the element in the subset
        subset.push_back(nums[i]);
        
        helper(nums,i+1,subset,res);
        subset.pop_back();
        return;
    }
    while(t--)
    {
        int N,L,R,X;
        cin >> N >> L >> R >> X;
        vector<int> val(N);
        for(int i=0;i<N;i++)
        {
            cin >> val[i];
        }
        int ans=0;
        vector<int> subs;
        funtion(vector<int> &val,0,subs,N,L,R,X,ans);
        return ans;
    }
}